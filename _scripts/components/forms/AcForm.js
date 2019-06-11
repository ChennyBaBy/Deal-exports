import React, { Component } from 'react';

class AcForm extends Component {
  render() {
    return (
    <>
      <div className="ch-form__group ch-display--block">
        <label htmlFor="url" className="ch-display--block ch-mb--0">AC Deal URL</label>
        <input type="text" name="url" id="url" className="ch-display--block ch-form__control" />
      </div>
      </>
    );
  }
}

export default AcForm;