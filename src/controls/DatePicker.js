import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { Field } from "formik";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const getDate = date => {
  if (getDate._last !== date) {
    getDate._last = date ? moment(date) : undefined;
  }

  return getDate._last;
};

let fieldCounter = 0;
class FormikInput extends Component {
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
              <SingleDatePicker
                id={this.id}
                date={getDate(field.value)}
                onDateChange={date => {
                  form.setFieldValue(
                    name,
                    date ? date.toDate().toISOString() : date,
                    false
                  );
                }}
                showDefaultInputIcon
                inputIconPosition="after"
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                noBorder
                readOnly
                enableOutsideDays
                isOutsideRange={() => false}
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

export default FormikInput;
