import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Select, { components } from "react-select";
import { Label } from "reactstrap";


const FormSelect = ({
    className,
    async,
    innerRef,
    options,
    value,
    allowSelectAll,
    selectAllLabel,
    isLoading,
    rightCallToAction,
    ...props
}) => {
    const SelectToRender = async ? Select.Async : Select;
    const everyOptionSelected =
        value && options && value.length === options.length;
    const thereIsMoreThanOneOption =
        (value && options && options.length - value.length > 1) || !value;
    const selectAllOption = {
        label: selectAllLabel,
        value: "formSelect_selectAll",
    };
    let optionsToShow = options;

    if (allowSelectAll) {
        if (!everyOptionSelected && thereIsMoreThanOneOption) {
            optionsToShow = [selectAllOption, ...(options || [])];
        }
    }
    return (
        <div className={`${className} default-form-box`}>
            {props.label && (
                <div className="flex">
                    <label
                        className="form-label form-label"
                        type={props.labelType || "label"}
                        fontSize="13px"
                    >
                        {props.label}
                    </label>
                    {rightCallToAction}
                </div>
            )}

            {
                <SelectToRender
                    {...props}
                    className={`${props.touched && props.error ? "is-invalid" : ""}`}
                    isLoading={isLoading}
                    classNamePerfix="select"
                    noResultsText={isLoading ? "Loading" : "No Result Found"}
                    options={optionsToShow}
                    value={value}
                    ref={innerRef}
                    onChange={(selectedOption) => {
                        if (selectedOption) {
                            if (
                                allowSelectAll &&
                                selectedOption.length > 0 &&
                                selectedOption[selectedOption.length - 1].value ===
                                selectAllOption.value
                            ) {
                                props.onChange(props.name, options);
                            } else {
                                props.onChange(props.name, selectedOption);
                            }
                        } else {
                            props.onChange(props.name);
                        }
                    }}
                    onBlur={props.onBlur}

                />
            }
            {props.help && (
                <div className="flex">
                    <div type="label-light" fontSize="13px">
                        {props.help || ""}
                    </div>
                </div>
            )}

            {props.touched && props.error && (
                <div className="flex">
                    <small className="text-danger" type="label-error " fontSize="13px">
                        {props.touched && props.error ? props.error : ""}
                    </small>
                </div>
            )}
        </div>
    );
};

FormSelect.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    labelType: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    touched: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
        PropTypes.array,
    ]),
    onBlur: PropTypes.func,
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    allowSelectAll: PropTypes.bool,
    selectAllLabel: PropTypes.string,
    isLoading: PropTypes.bool,
    help: PropTypes.string,
};

export default styled(FormSelect)`
  outline: none;
  margin: 19px 0px;
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "100%")};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => (props.margin ? props.margin : "19px 0px")};
  width: ${(props) => props.width || "100%"};
  ${(props) => {
        if (props.margin) {
            return `margin: ${props.margin}px;`;
        }
    }}
  min-height: ${(props) => props.minHeight || "60px"};
  /* & > * {
    margin-bottom: 5px;
  } */
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .Select-control {
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
  }
  .Select-menu-outer {
    z-index: 999999999;
  }
  ${(props) =>
        props.touched &&
        !!props.error &&
        css`
      .Select-control {
        border-color: var(--error-color) !important;
      }
    `};
  ${(props) =>
        props.multi &&
        css`
      .Select-value {
        border-radius: 4px;
        background-color: #0080de;
        border: none;
        color: white;
        display: inline-flex;
        flex-direction: row-reverse;
        & > span {
          border: none;
        }
      }
    `};
`;