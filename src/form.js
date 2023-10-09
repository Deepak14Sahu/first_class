import { Component } from "react";
import "./form.css";

class Form extends Component {
  render() {
    return (
      <div className="modal">
        <h1>DATA FORM</h1>

        <form onSubmit={this.props.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="name">Name:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="name"
                name="name"
                value={this.props.formInputData.name}
                placeholder="Your name..."
                onChange={this.props.handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="age">Age:</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                id="age"
                name="age"
                value={this.props.formInputData.age}
                placeholder="Your age..."
                onChange={this.props.handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="email">Email:</label>
            </div>
            <div className="col-75">
              <input
                type="email"
                id="email"
                name="email"
                value={this.props.formInputData.email}
                placeholder="Your Email..."
                onChange={this.props.handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="mobile">Mobile:</label>
            </div>
            <div className="col-75">
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={this.props.formInputData.mobile}
                placeholder="Your Mobile number..."
                onChange={this.props.handleChange}
                maxLength="10"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="city">City:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="city"
                name="city"
                value={this.props.formInputData.city}
                placeholder="Your City..."
                onChange={this.props.handleChange}
                required
              />
            </div>
          </div>

          <div>
            <button type="submit" value="Submit" id="submit">
              {this.props.formInputData.id === 0 ? "Submit" : "Update"}
            </button>
            <button id="cancle" onClick={this.props.handleCancleClick}>
              Cancle
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
