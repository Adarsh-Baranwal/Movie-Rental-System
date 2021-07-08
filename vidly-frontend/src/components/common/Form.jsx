import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, error: {} };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };
  validateproperty = (input) => {
    let obj = { [input.name]: input.value };
    const schema = {
      [input.name]: this.schema[input.name],
    };
    const result = Joi.validate(obj, schema);
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) {
      error[item.path[0]] = item.message;
    }
    return error;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;

    this.dosubmit();
  };
  handleChange = (e) => {
    let error = { ...this.state.error };
    error = this.validateproperty(e.currentTarget);
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, error: error || {} });
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type) => {
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.error[name]}
      />
    );
  };

  renderSelect = (name, label, list) => {
    let { data, error } = this.state;
    return (
      <Select
        name={name}
        label={label}
        list={list}
        value={data[name]}
        error={error[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
