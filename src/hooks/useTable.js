import {
  makeStyles,
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    // marginTop: theme.spacing(2),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": { fontWeight: "300" },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

function useTable(records, headCells) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setPowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TableContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );
  const TblHead = (props) => {
    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map((cell) => (
            <TableCell
              key={cell.id}
              sortDirection={orderBy === cell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === cell.id}
                direction={orderBy === cell.id ? order : "asc"}
                onClick={() => {
                  handleRequestSort(cell.id);
                }}
              >
                {cell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRows = (event) => {
    setPowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const TblPagination = () => (
    <TablePagination
      rowsPerPageOptions={pages}
      component="div"
      count={records.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChange}
      onChangeRowsPerPage={handleChangeRows}
    />
  );
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const recordsAfter = () => {
    return stableSort(records, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };
  return {
    TableContainer,
    TblHead,
    TblPagination,
    recordsAfter,
  };
}

export default useTable;
