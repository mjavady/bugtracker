import React, { useContext, useState } from "react";
import { Button, Col, Icon, Row, Select, TextInput } from "react-materialize";
import { AuthContext } from "../../hooks/authContext";

function TicketForm() {
  const [values, setValues] = useState({
    title: "",
    priority: "",
    description: "",
    user: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
      // user: auth.loggedInUser.toString(),
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Row>
      <Col s={12}>
        <div className="card form-card">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <TextInput
                  onChange={handleChange}
                  name="title"
                  s={12}
                  icon="title"
                  label="title"
                  value={values.title}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Select
                  onChange={handleChange}
                  name="priority"
                  s={12}
                  icon={<Icon>priority_high</Icon>}
                  label="priority"
                  multiple={false}
                  // onChange={function noRefCheck() {}}
                  options={{
                    classes: "",
                    dropdownOptions: {
                      alignment: "left",
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      outDuration: 150,
                    },
                  }}
                  value=""
                >
                  <option disabled value="">
                    Choose your option
                  </option>
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <TextInput
                  onChange={handleChange}
                  name="description"
                  s={12}
                  icon="description"
                  label="description"
                  value={values.description}
                />
                <TextInput
                  name="attachment"
                  s={12}
                  icon={<Icon>attach_file</Icon>}
                  label="Attachment"
                  type="file"
                />
              </Col>
            </Row>
            <Button waves type="submit">
              Send
            </Button>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default TicketForm;
