import React from "react";
import Options from "./Options";

const HostList = ({ optionValues, ...props }) => {
  var hostNodes = optionValues.map(optionValue => {
    return (
      <Options
        key={optionValue._id}
        optionValue={optionValue.firstname + " " + optionValue.lastname}
      />
    );
  });
  return (
    <div>
      <select value={"Select"} name="host" onChange={myChangeHandler}>
        <option />
        {hostNodes}
      </select>
    </div>
  );
};

export default HostList;
