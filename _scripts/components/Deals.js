import React, { Component } from 'react';
import SavedDeals from './SavedDeals';
import AcvmForm from './forms/AcvmForm';
import AcForm from './forms/AcForm';
import PchForm from './forms/PchForm';

class Deals extends Component {
  constructor(props) {
    super(props)
    this.clearAll = this.clearAll.bind(this)
    this.deleteDeal = this.deleteDeal.bind(this)
    this.addData = this.addData.bind(this)
    this.state = {
      dealString: [],
      type: "acvm",
      deal: [],
      loading: false,
      error: false
    }
  }

  saveDeal() {
    let inputs = document.querySelectorAll("input")
    let value
    if (this.state.dealString) {
      value = this.state.dealString.concat(this.state.deal)
    } else { value = this.state.deal }

    this.setState({
      dealString: value
    }, () => {
      console.log("In save():")
      console.log(this.state.dealString)
    })

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }

  addData() {
    let _this = this
    let data = []
    if (this.state.type == "acvm") {
      data.push(
        {
          "Name": document.querySelector("#name").value,
          "Spec": document.querySelector("#variant").value,
          "C02": document.querySelector("#c02").value,
          "MPG": document.querySelector("#mpg").value,
          "Image": document.querySelector("#image").value,
          "Monthly": document.querySelector("#monthly").value,
          "Deposit": document.querySelector("#deposit").value,
          "Months": document.querySelector("#months").value,
          "USP": document.querySelector("#usp").value
        }
      )

      this.setState({
        deal: data
      }, () => {
        console.log("In push:")
        console.log(this.state.deal)
      })
    }

    else if (this.state.type == "ac") {
      this.setState({
        loading: true
      }, () => {
        fetch("https://cors.io/?" + document.querySelector("#url").value + '.json')
          .then(
            function (response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }

              // Examine the text in the response
              response.json().then(function (output) {
                let data = []
                data.push(
                  {
                    "Origin": document.querySelector("#url").value,
                    "Name": `${output.make} ${output.model}`,
                    "Spec": output.variant,
                    "Image": output.photos[0],
                    "URL": output.enquiryUrl,
                    "Monthly": output.pricing.monthlyPayment,
                    "Deposit": output.pricing.deposit,
                  }
                )
                _this.setState({
                  deal: data,
                  loading: false,
                  error: false
                })
              });
            }
          )
          .catch(function (err) {
            _this.setState({
              error: true
            })
          });
      });
    }
    else {
      data.push(
        {
          "Name": document.querySelector("#name").value,
          "Spec": document.querySelector("#variant").value,
          "Image": document.querySelector("#image").value,
          "Monthly": parseInt(document.querySelector("#monthly").value),
          "Deposit": parseInt(document.querySelector("#deposit").value),
          "Features": document.querySelector("#list").value.split(','),
          "Enquiry": document.querySelector("#enquiry").value
        }
      )
      this.setState({
        deal: data
      }, () => console.log(this.state.deal))
    }
  }
  
componentDidUpdate() {
  let inputs = document.querySelectorAll("input")
  for(let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", this.addData)
  }
}

  componentDidMount() {
    let inputs = document.querySelectorAll("input")

    for(let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", this.addData)
    }
  }

  /* Render blocks function */
  renderBlocks() {
    const blks = (
      <div className="sm:ch-col--12 md:ch-col--6 md:ch-col--offset-3 deal-block">
        <div className="ch-mb--4 ch-ba--1 ch-bc--grey-3 ch-rounded ch-pa--2 sm:ch-pa--4 ch-bg--grey-1">
          <h3>Your deal</h3>
          {this.state.type == "acvm" &&
            <AcvmForm />
          }
          {this.state.type == "ac" &&
            <AcForm />
          }
          {this.state.type == "pch" &&
            <PchForm />
          }
          <button
            className="ch-btn"
            onClick={e => this.saveDeal()}
            disabled={this.state.loading}
          >
            Save this deal
          </button>
          {this.state.error &&
          <p>Please enter a full URL, the data fetching is quite tempramental so if you can't click the button above then try again in 5 minutes 👾</p>
          }
        </div>
      </div>
    )
    return blks
  }

  clearAll() {
    this.setState({ dealString: [] });
  }

  deleteDeal(i) {
    let deals = this.state.dealString
    deals.splice(i, 1);
    this.setState({ dealString: deals });
  }

  // Handle click function
  handleSwitch = (e) => {
    this.setState({
      type: e.target.value,
      deal: [],
      dealString: []
    });
  }

  render() {
    return (
      <>
        <div className="typeSwitcher">
          <div className="ch-container">
            <div className="ch-row">
              <div className="sm:ch-col--12 md:ch-col--6 md:ch-col--offset-3">
              <div className="ch-form__group">
                <label htmlFor="typeSwitch" className="ch-form__control-label">Deal type</label>
                <select name="typeSwitch" className="ch-form__control" onChange={e => this.handleSwitch(e)} value={this.state.type}>
                  <option value="acvm">ACVM</option>
                  <option value="ac">Arnold Clark</option>
                  <option value="pch">PCH</option>
                </select>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar__toggle">
          <button className="ch-btn">Menu <i className="fa fa-bars"></i></button>
        </div>
        <div className="sidebar ch-display--none">
          <div className="sidebar__header">
            <h3 className="ch-mb--0">Menu</h3>
            <button className="ch-btn ch-btn--sm">Close <i className="fa fa-close"></i></button>
          </div>
          <SavedDeals saved={this.state.dealString} clearAll={this.clearAll} delete={this.deleteDeal} type={this.state.type} />
        </div>
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

export default Deals
