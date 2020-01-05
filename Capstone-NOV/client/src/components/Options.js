import React from 'react';

export default class Options extends React.Component {

  render() {
    return (
      <option value={this.props.id}>{this.props.optionValue}</option>
    );
  }
}
