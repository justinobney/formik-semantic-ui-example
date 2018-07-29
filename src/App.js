import React, { Component } from "react";
import {
  Segment,
  Container,
  Header,
  Form,
  Button,
  Label,
  Input
} from "semantic-ui-react";
import { Formik, Field } from "formik";

class App extends Component {
  _handleSubmit = (values, formikApi) => {
    formikApi.setFieldError("email", "This email can not be used.");
    formikApi.setSubmitting(false);
  };
  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Header as="h2" attached="top">
          Formik-Semantic-UI
        </Header>

        <Segment attached>
          <LoginForm
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={this._handleSubmit}
          />
        </Segment>
      </Container>
    );
  }
}

class LoginForm extends Component {
  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        render={({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FormikInput label="Email" name="email" />
            <FormikInput
              label="Password"
              name="password"
              inputProps={{
                type: "password"
              }}
            />
            <Button type="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      />
    );
  }
}

let fieldCounter = 0;
class FormikInput extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id || `field_${fieldCounter++}`;
  }

  render() {
    const { name, label, inputProps = {} } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error}>
              <label htmlFor={this.id}>{label}</label>
              <Input
                id={this.id}
                name={name}
                value={field.value}
                onChange={(e, { name, value }) => {
                  form.setFieldValue(name, value, false);
                }}
                {...inputProps}
              />
              {form.errors[name] &&
                form.touched[name] && (
                  <span
                    style={{
                      display: "block",
                      margin: ".28571429rem 0",
                      color: "rgb(159, 58, 56)",
                      fontSize: ".92857143em"
                    }}
                  >
                    {form.errors[name]}
                  </span>
                )}
            </Form.Field>
          );
        }}
      />
    );
  }
}

export default App;
