import React, { useEffect } from "react";
import EventApi from "../../data/EventApi";

export const DeleteEvent = props => {
  console.log(props);
  useEffect(() => {
    EventApi.deleteEvent(props.match.params.id, props.history.push, "/events");
  }, []);

  return null;
};

export default DeleteEvent;
