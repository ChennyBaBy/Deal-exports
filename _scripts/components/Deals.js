import React, { Component } from 'react';
import { setCookie, getCookie, checkCookie } from './functions';

class Data extends Component {
  constructor(props) {
    super(props);
    document.cookie = "deals=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  saveDeal() {
    let inputs = document.querySelectorAll("input")
    let value
    if (checkCookie()) {
      value = getCookie("deals").slice(0, -1) + ", " + this.state.dealString.slice(1, this.state.dealString.length)
    }
    else {
      value = this.state.dealString
    }
    setCookie("deals", value, 15)
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }

  componentDidMount() {
    let inputs = document.querySelectorAll("input")
    let _this = this
    let data = []
    

    for(let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", function(e) {
        data.length = 0
        data.push(
          {
            "Name": document.querySelector("#name").value,
            "Spec": document.querySelector("#variant").value,
            "C02": document.querySelector("#c02").value,
            "MPG": document.querySelector("#mpg").value,
            "Image": document.querySelector("#image").value,
            "Monthly": parseInt(document.querySelector("#monthly").value),
            "Deposit": parseInt(document.querySelector("#deposit").value),
            "Months": parseInt(document.querySelector("#months").value),
            "USP": document.querySelector("#usp").value
          }
        )
        _this.setState({
          inputTrue: true,
          deal: data,
          dealString: JSON.stringify(data)
        })
      })
    }
  }

  /* Render blocks function */
  renderBlocks() {
    const blks = (
      <div className="sm:ch-col--12 md:ch-col--6 md:ch-col--offset-3 deal-block">
        <div className="ch-mb--4 ch-ba--1 ch-bc--grey-3 ch-rounded ch-pa--2 sm:ch-pa--4 ch-bg--grey-1">
          <h3>Your deal</h3>
          <div className="ch-form__group ch-display--block">
            <label htmlFor={"name"} className="ch-display--block ch-mb--0">Car name</label>
            <input type="text" name="Name" id={"name"} className="ch-display--block ch-form__control" />
          </div>
          <div className="ch-form__group ch-display--block">
            <label htmlFor={"variant"} className="ch-display--block ch-mb--0">Variant</label>
            <input type="text" name="Spec" id={"variant"} className="ch-display--block ch-form__control" />
          </div>
          <div className="ch-row">
            <div className="xs:ch-col--6 ch-mh--0">
              <div className="ch-form__group ch-display--block">
                <label htmlFor={"c02"} className="ch-display--block ch-mb--0">C0₂</label>
                <input type="text" name="c02" id={"c02"} className="ch-display--block ch-form__control" />
              </div>
            </div>
            <div className="xs:ch-col--6 ch-mh--0">
              <div className="ch-form__group ch-display--block">
                <label htmlFor={"mpg"} className="ch-display--block ch-mb--0">MPG</label>
                <input type="text" name="mpg" id={"mpg"} className="ch-display--block ch-form__control" />
              </div>
            </div>
          </div>
          <div className="ch-row">
            <div className="xs:ch-col--6 ch-mh--0">
              <div className="ch-form__group ch-display--block">
                <label htmlFor={"deposit"} className="ch-display--block ch-mb--0">Deposit (£)</label>
                <input type="number" name="Deposit" id={"deposit"} className="ch-display--block ch-form__control" />
              </div>
            </div>
            <div className="xs:ch-col--6 ch-mh--0">
              <div className="ch-form__group ch-display--block">
                <label htmlFor={"monthly"} className="ch-display--block ch-mb--0">Monthly (£)</label>
                <input type="number" name="Monthly" id={"monthly"} className="ch-display--block ch-form__control" />
              </div>
            </div>
          </div>
          <div className="ch-form__group ch-display--block">
            <label htmlFor={"image"} className="ch-display--block ch-mb--0">Image URL</label>
            <input type="text" name="Image" id={"image"} className="ch-display--block ch-form__control" />
          </div>
          <div className="ch-row">
            <div className="xs:ch-col--6 ch-mh--0">
              <div className="ch-form__group ch-display--block">
                <label htmlFor={"usp"} className="ch-display--block ch-mb--0">USP</label>
                <input type="text" name="USP" id={"usp"} className="ch-display--block ch-form__control" />
              </div>
            </div>
            <div className="xs:ch-col--6 ch-mh--0">
              <div className="ch-form__group ch-display--block">
                <label htmlFor={"months"} className="ch-display--block ch-mb--0">Term (months)</label>
                <input type="number" name="Months" id={"months"} className="ch-display--block ch-form__control" />
              </div>
            </div>
          </div>
          <button
            className="ch-btn"
            onClick={e => this.saveDeal()}
          >
            Save this deal
          </button>
        </div>
      </div>
    )
    return blks
  }


  render() {
    return (
      <>
        <div className="form">
          <div className="ch-container">
            <div className="ch-row">
              {this.renderBlocks()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Data
