import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";

import ExampleForm from "./forms/ExampleForm";
// import LoginForm from "./forms/LoginForm";

class App extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 50 }}>
        <Header as="h2" attached="top" inverted>
          Formik-Semantic-UI
        </Header>

        <Segment attached>
          <ExampleForm />
        </Segment>
      </Container>
    );
  }
}

export default App;
