import React, { Component } from "react";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";

import {
  Input,
  Checkbox,
  DatePicker,
  Dropdown,
  FileUpload,
  TextArea
} from "./controls/index";

class App extends Component {
  _handleSubmit = (values, formikApi) => {
    console.log(values);
    setTimeout(() => {
      Object.keys(values).forEach(key => {
        formikApi.setFieldError(key, "Some Error");
      });
      formikApi.setSubmitting(false);
    }, 1000);
  };

  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Header as="h2" attached="top">
          Formik-Semantic-UI
        </Header>

        <Segment attached>
          <Formik
            initialValues={{
              emailAddress: "",
              firstName: "",
              lastName: "",
              gender: "",
              ssn: "",
              notes: "",
              dob: "",
              fileUrl: "",
              likesCake: false
            }}
            onSubmit={this._handleSubmit}
            render={this._renderForm}
          />
        </Segment>
      </Container>
    );
  }

  _renderForm = ({ handleSubmit, isSubmitting }) => (
    <Form onSubmit={handleSubmit}>
      <Input label="Email" name="emailAddress" />

      <Form.Group>
        <Input
          label="First Name"
          name="firstName"
          fieldProps={{ width: "8" }}
        />
        <Input label="Last Name" name="lastName" fieldProps={{ width: "8" }} />
      </Form.Group>

      <Form.Group>
        <DatePicker label="D.O.B." name="dob" fieldProps={{ width: "8" }} />
      </Form.Group>

      <Form.Group>
        <Input
          label="SSN"
          name="ssn"
          inputProps={{
            type: "password"
          }}
          fieldProps={{ width: "8" }}
        />
        <Dropdown
          label="Gender"
          name="gender"
          options={[
            { text: "Female", value: "F" },
            { text: "Male", value: "M" }
          ]}
          fieldProps={{ width: "8" }}
        />
      </Form.Group>

      <TextArea label="Notes" name="notes" />
      <Checkbox label="I like cake" name="likesCake" />

      <FileUpload label="Profile Picture Upload" name="fileUrl" />

      <Button type="submit" loading={isSubmitting} primary>
        Submit
      </Button>
      <Button type="button" basic>
        Cancel
      </Button>
    </Form>
  );
}

export default App;
