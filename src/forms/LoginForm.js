import React from "react";
import { Button, Form, Input } from "semantic-ui-react";

class LoginForm extends React.Component {
  state = { email: "", errors: {} };
  render() {
    const { email, errors, submitting } = this.state;
    return (
      <Form
        onSubmit={() => {
          console.log(this.state);
          this.setState({ errors: { email: "Wrong" }, submitting: true });
        }}
      >
        <Form.Field error={!!errors.email}>
          <label>Email:</label>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={(e, { value }) => this.setState({ email: value })}
          />
        </Form.Field>
        <Button primary type="submit" loading={submitting}>
          Submit
        </Button>
        <Button basic>Cancel</Button>
      </Form>
    );
  }
}

export default LoginForm;
