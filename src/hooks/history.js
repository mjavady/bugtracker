import React, { useState } from "react";
import axios from "axios";

const useHistory = () => {
  const [histories, setHistories] = useState();
  const postHistory = async (value) => {
    const res = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/newhistory",
      value
    );
  };

  const fetchHistory = async (projectID) => {
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + "/newhistory",
      {
        params: {
          projectID: projectID,
        },
      }
    );
    setHistories(res.data);
  };

  const getHistory = (projectID) => {
    fetchHistory(projectID);
    return histories;
  };

  function recordHistory(typeOfRecord, projectID) {
    const values = {
      typeOfChange: typeOfRecord,
      projectID: projectID,
      date: new Date().toLocaleString(),
    };
    postHistory(values);
  }

  return {
    getHistory,
    recordHistory,
  };
};

export default useHistory;
