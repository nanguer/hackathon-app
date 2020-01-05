import React from 'react';
import Options from './Options';

export default class HostList extends React.Component {

  render() {
    var hostNodes = this.props.optionValues.map(optionValue => {
      console.log(optionValue);
      return (
        <Options
          key={optionValue._id}
          optionValue={optionValue.firstname + " " + optionValue.lastname}
        />
      )
    });
    return (
      <div>
        <select value={"Select"} name="host" onChange={this.myChangeHandler}>
          <option />
          {hostNodes}
        </select>
      </div>
    );
  }
}
