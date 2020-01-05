import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Maps from "../Maps";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
import { connect } from "react-redux";
import AbsoluteWrapper from "../AbsoluteWrapper";

export const EventDetails = props => {
  const [eventDetails, setEventDetails] = useState({
    event: "",
    title: "",
    description: "",
    status: "",
    startDate: "",
    endDate: "",
    location: "",
    host: "",
    evaluator: ""
  });
  useEffect(() => {
    const BASE_URL = process.env.BASE_URL;

    async function fetchedEventDetails() {
      const res = await axios.get(
        `${BASE_URL}/event/eventDetails/${props.match.params.id}`,
        {
          crossDomain: true
        }
      );
      try {
        setEventDetails({
          title: res.data.title,
          description: res.data.description,
          status: res.data.status,
          startDate: moment(res.data.startDate).format("YYYY-MM-DD"),
          endDate: moment(res.data.endDate).format("YYYY-MM-DD"),
          location: res.data.location,
          latLng: res.data.latLng,
          host:
            res.data.hostDetails.firstName +
            " " +
            res.data.hostDetails.lastName,
          evaluator:
            res.data.evaluatorDetails.firstName +
            " " +
            res.data.evaluatorDetails.lastName
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchedEventDetails();
  }, []);

  const handleBack = () => {
    props.history.goBack();
  };

  const shareUrl = `https://hackathon-management.herokuapp.com/ props.location.pathname}`;
  const quote = "Take a look at this hackathon event!";
  const {
    title,
    description,
    status,
    startDate,
    endDate,
    location,
    host,
    evaluator,
    latLng
  } = eventDetails;

  return (
    <AbsoluteWrapper>
      <div
        className="container justify-content-center align-content-center"
        style={{ marginTop: "50px" }}
      >
        <div className="container row justify-content-center">
          <h1 className="font-bold text-center">Event Details</h1>
        </div>

        <div className="container event-page d-flex justify-content-center mt-5 ">
          <div className="event-details-container text-center text-lg-left">
            <div>
              <label className="event-key"> Title :</label> <p>{title}</p>
            </div>
            <div>
              <label className="event-key">Event Description :</label>{" "}
              <p>{description}</p>
            </div>
            <div>
              <label className="event-key">Status : </label>
              <span> {status}</span>
            </div>
            <div>
              <label className="event-key">Start Date :</label>{" "}
              <span> {startDate}</span>
            </div>
            <div>
              <label className="event-key">End Date :</label>{" "}
              <span> {endDate}</span>
            </div>
            <div>
              <label className="event-key">Location :</label>
              <span> {location}</span>
            </div>
            <div>
              <label className="event-key">Host :</label> <span> {host}</span>
            </div>
            <div>
              <label className="event-key">Evaluators :</label>{" "}
              <span> {evaluator}</span>
            </div>
          </div>
          {latLng ? <Maps lat={latLng.lat} lng={latLng.lng} /> : null}
        </div>
        {!props.auth.isAdmin ? (
          <div
            className="container d-flex justify-content-center"
            style={{ marginTop: "30px" }}
          >
            <div style={{ cursor: "pointer" }}>
              <FacebookShareButton url={shareUrl} quote={quote}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
            </div>
            <div style={{ cursor: "pointer" }}>
              <TwitterShareButton url={shareUrl} quote={quote}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
            </div>
            <div style={{ cursor: "pointer" }}>
              <LinkedinShareButton url={shareUrl} quote={quote}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
            </div>
          </div>
        ) : null}
        <div
          className="container-fluid d-flex justify-content-center"
          style={{ margin: "22px 0px" }}
        >
          <button className="btn btn-info" type="button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </AbsoluteWrapper>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(EventDetails);
