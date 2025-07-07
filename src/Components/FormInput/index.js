import React, { Component } from "react";
import { FormFeedback, FormGroup, FormText, Input, Label } from "reactstrap";
class FormInput extends Component {
  render() {
    const {
      placeholder,
      label,
      name,
      type,
      error,
      touched,
      help,
      labelHelp,
      formGroupClass,
    } = this.props;
    return (
      <FormGroup>
        {/* {JSON.stringify(this.props)} */}
        {label && (
          <Label className="form-label" for={name}>
            {label}
          </Label>
        )}
        {labelHelp && <small className="text-muted">{labelHelp}</small>}

        <Input
          {...this.props}
          //   autoFocus
          id={name}
          name={name}
          placeholder={placeholder}
          // readOnly
          //value="Hello"
          invalid={touched && error}
        />
        {touched && error && (
          <p className="fs-11 text-danger pt-1 mb-0">{error}</p>
        )}
        {help && (
          <FormText className="text-muted">
            Find helper text here for given textbox.
          </FormText>
        )}
      </FormGroup>
    );
  }
}

export default FormInput;
