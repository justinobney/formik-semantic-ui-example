import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { Field } from "formik";
import moment from "moment";

import "semantic-ui-calendar-react/dist/css/calendar.min.css";

const getDate = date => {
  if (getDate._last !== date) {
    getDate._last = date ? moment(date) : undefined;
  }

  return getDate._last;
};

let fieldCounter = 0;
class FormikDatePicker extends Component {
  state = {
    focused: false
  };

  constructor(props) {
    super(props);
    this.id = props.id || `field_datepicker_${fieldCounter++}`;
  }

  render() {
    const { name, label, inputProps = {}, fieldProps = {} } = this.props;
    return (
      <Field
        name={name}
        render={({ field, form }) => {
          const error = form.touched[name] && form.errors[name];
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}
              <DateInput
                id={this.id}
                name={name}
                dateFormat="MM-DD-YYYY"
                closable
                {...inputProps}
                value={field.value}
                onChange={(e, { name, value }) => {
                  form.setFieldValue(name, value, true);
                }}
                autoComplete="none"
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

export default FormikDatePicker;
