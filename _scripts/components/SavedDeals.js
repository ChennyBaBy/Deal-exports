import React, { Component } from "react";

class SavedDeals extends Component {
  constructor(props) {
    super(props);
    this.jsonButton = React.createRef();
    this.csvButton = React.createRef();
    this.htmlButton = React.createRef();
    this.state = {
      hasValue: false
    };
  }

  /* Download button functions */
  DownloadJSON2CSV(objArray) {
    let array = typeof objArray != "object" ? objArray : objArray;
    let str =
      "Name, Spec, C02, MPG, Image, Monthly, Deposit, Months, USP" + "\r\n";

    for (let i = 0; i < array.length; i++) {
      let line = "";

      for (let index in array[i]) {
        line += array[i][index] + ",";
      }

      line.slice(0, line.Length - 1);

      str += line + "\r\n";
    }
    let blob = new Blob([str], {
      type: "text/csv"
    });
    let url = URL.createObjectURL(blob);
    return url;
  }

  createDownloadJSONButton(data) {

    let blob = new Blob([JSON.stringify(data)], {
      type: "application/json"
    });
    let url = URL.createObjectURL(blob);

    return url;
  }

  downloadHTML(data) {
    let htmlurl = "#"
    if (this.props.saved) {
      data = data;
      let str = ``;
      for (let i = 0; i < data.length; i++) {
        str += `
<table class="container bg-white" bgcolor="#ffffff">
  <tr>
    <td>
      <table class="row row--white">
        <tr class="article">
          <td class="wrapper content">
            <table class="six columns article-image">
              <tr>
                <td class="text-pad-left">
                  <center>
                    <table class="row--white">
                      <tr>
                        <td class="text-pad">
                          <img width="215" label="Car image" src="${
                            data[i].Image
                          }" alt="${data[i].Name}" class="center"/>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
              </tr>
            </table>
          </td>
          <td class="wrapper content last">
            <table class="six columns article-image">
              <tr>
                <td class="text-pad-right">
                  <center>
                    <table class="row--white">
                      <tr>
                        <td class="text-pad">
                          <h5 class="mobile-center make-model">${
                            data[i].Name
                          }</h5>
                          <p class="mobile-center variant">${data[i].Spec}</p>
                          <p class="mobile-center emissions">${
                            data[i].MPG
                          } mpg | ${data[i].C02} g/km CO₂</p>
                          <p class="from-price mobile-center">First rental<br><strong><span class="from-price--number">£${
                            data[i].Deposit
                          }</span></strong></p>
                          <p class="saving mobile-center">Monthly rental<br><strong><span class="saving--number">£${
                            data[i].Monthly
                          }</span></strong></p>
                          <a href="https://autocentre.acvm.com/cgi-bin/tools/?type=affinity" class="blue-link mobile-center link" color="#00a3e0">Find out more</a>
                        </td>
                      </tr>
                    </table>
                  </center>
                </td>
                <td class="expander"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<table class="container bg-white" bgcolor="#ffffff">
  <tr>
    <td>
      <table class="row row--white">
        <tr>
          <td class="wrapper content last">
            <table class="twelve columns">
              <tr>
                <td class="text-pad">
                  <hr>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

`;
      }
      let htmlblob = new Blob([str], {
        type: "text/html"
      });
      htmlurl = URL.createObjectURL(htmlblob);

      return htmlurl;
    }
  }

  

  renderBlocks() {
    let deals;
    if (this.props.saved.length == 0) {
      deals = <p className="ch-mv--2">Add some deals</p>;
    } else {
      const savedDeals = this.props.saved;
      this.createDownloadJSONButton(savedDeals);
      deals = savedDeals.map((deal, index) => (
        <div className="saved__deal" key={index}>
          <div className="ch-mb--4 ch-ba--1 ch-bc--grey-3 ch-rounded ch-pa--2 sm:ch-pa--4 ch-bg--grey-1 ch-mv--2">
            <i className="deleteDeal fa fa-close ch-color--ac-magenta" onClick={() => this.props.delete(index)} />
            <h3>{deal.Name}</h3>
            <p className="ch-pb--0">{deal.Spec}</p>
          </div>
        </div>
      ));
    }
    return deals;
  }

  render() {
    return (
      <>
        {this.props.saved.length > 0 &&
          <p className="ch-mv--2 ch-text--right">
            <button className="ch-btn ch-btn--link" onClick={this.props.clearAll}>Clear all</button>
          </p>
        }
        {this.renderBlocks()}
        {this.props.saved.length > 0 && (
          <div className="ch-bt--1 ch-bc--grey-3 ch-mt--3 ch-pt--2">
            <a
              ref={this.jsonButton}
              href={this.createDownloadJSONButton(this.props.saved)}
              id="genJSON"
              className="ch-mb--2 ch-btn ch-btn--success ch-display--block ch-text--center"
              download="affinity-deals.json"
            >
              Generate JSON
            </a>
            <a
              ref={this.csvButton}
              href={this.DownloadJSON2CSV(this.props.saved)}
              id="genCSV"
              className="ch-mb--2 ch-btn ch-btn--secondary ch-display--block ch-text--center"
              download="affinity-deals.csv"
            >
              Generate CSV
            </a>
            <a
              ref={this.htmlButton}
              href={this.downloadHTML(this.props.saved)}
              id="genEmail"
              className=" ch-btn ch-btn--primary ch-display--block ch-text--center"
              download="affinity-deals.html"
            >
              Generate HTML
            </a>
          </div>
        )}
      </>
    );
  }
}

export default SavedDeals;
