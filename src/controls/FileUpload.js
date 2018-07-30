import React, { Component } from "react";
import { Form, Header, Icon, Progress, Segment } from "semantic-ui-react";
import { Field } from "formik";
import Dropzone from "react-dropzone";
// import p from "prop-types";

const validFileStyle = {
  borderColor: "blue"
};

const invalidFileStyle = {
  borderColor: "red"
};

const emptyStyle = {};

let fieldCounter = 0;
class FileUpload extends Component {
  state = {
    uploading: false,
    progress: 0
  };

  constructor(props) {
    super(props);
    this.id = props.id || `field_fileupload_${fieldCounter++}`;
  }

  render() {
    const { name, label, fieldProps = {} } = this.props;
    return (
      <Field
        name={name}
        render={({ form }) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <Dropzone
                accept="image/png"
                style={emptyStyle}
                multiple={false}
                onDrop={() => {
                  this.setState({ uploading: true, progress: 0 }, () => {
                    this._counter = setInterval(() => {
                      this.setState(
                        state => ({
                          progress: state.progress + 10
                        }),
                        () => {
                          if (this.state.progress >= 100) {
                            clearInterval(this._counter);
                            form.setFieldValue(name, "url://some_url", false);
                            this.setState({ uploading: false });
                          }
                        }
                      );
                    }, 150);
                  });
                }}
              >
                {({ isDragActive, isDragReject, acceptedFiles }) => {
                  const wrapperStyle = {
                    border: "1px dashed rgba(34,36,38,.15)",
                    boxShadow: "none",
                    cursor: "copy",
                    ...(isDragActive ? validFileStyle : emptyStyle),
                    ...(isDragReject || error ? invalidFileStyle : emptyStyle)
                  };
                  const { uploading, progress } = this.state;
                  const file = [...acceptedFiles].pop();
                  const color =
                    !!file && !uploading
                      ? "green"
                      : isDragActive || uploading
                        ? "blue"
                        : "grey";

                  return (
                    <Segment style={wrapperStyle}>
                      {!!progress && (
                        <Progress
                          percent={progress}
                          attached="top"
                          autoSuccess
                          color="blue"
                        />
                      )}
                      <Header
                        icon
                        textAlign="center"
                        size="small"
                        color={color}
                      >
                        <Icon name="cloud upload" color={color} />
                        <Header.Content>
                          {file ? (
                            <React.Fragment>
                              {file.name} - {file.size} bytes
                              <Header.Subheader>
                                {uploading ? "Uploading.." : "Uploaded"}.
                              </Header.Subheader>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              Drag Files Here
                              <Header.Subheader>
                                Or click to browse
                              </Header.Subheader>
                            </React.Fragment>
                          )}
                        </Header.Content>
                      </Header>
                    </Segment>
                  );
                }}
              </Dropzone>
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

export default FileUpload;
