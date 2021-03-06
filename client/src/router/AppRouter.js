import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Links from "../components/Links";
import EventHome from "../components/events/EventHome";
import DeleteEvent from "../components/events/DeleteEvent";
import EventIdeas from "../components/events/EventIdeas";
import UserHome from "../components/user/UserHome";
import AddUserLoader from "../components/user/loaders/AddUserLoader";
import EditUserLoader from "../components/user/loaders/EditUserLoader";
import AdminLogin from "../components/login/AdminLogin";
import DeleteUser from "../components/user/DeleteUser";
import UserEvents from "../components/user/UserEvents";
import LandingPage from "../components/LandingPage";
import ParticipantHome from "../components/participant/ParticipantHome";
import RegisterForEvent from "../components/participant/RegisterForEvent";
import ParticipantEventDetails from "../components/participant/ParticipantEventDetails";
import AddTeamMember from "../components/participant/AddTeamMember";
import TeamDetails from "../components/participant/TeamDetails";
import ErrorPage from "../components/ErrorPage";
import EvaluateIdea from "../components/events/EvaluateIdea";
import AddEventLoader from "../components/events/loaders/AddEventLoader";
import EditEventLoader from "../components/events/loaders/EditEventLoader";
import EventDetailsLoader from "../components/events/loaders/EventDetailsLoader";

export const AppRouter = withRouter(({ location }) => {
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: { opacity: 0, transform: "translate(-50%, 0)" }
  });

  return (
    <div style={{ height: "100%" }}>
      {location.pathname !== "/login" && location.pathname !== "/addUser" && (
        <Links />
      )}
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div
            key={key}
            style={{
              height: "100%",
              ...props
            }}
          >
            <Switch location={item}>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="/events" component={EventHome} />
              <Route path="/edit/:id" component={EditEventLoader} />
              <Route path="/addEvent" component={AddEventLoader} />
              <Route path="/delete/:id" component={DeleteEvent} />
              <Route path="/details/:id" component={EventDetailsLoader} />
              <Route path="/users" component={UserHome} />
              <Route path="/addUser" component={AddUserLoader} />
              <Route exact path="/login" render={() => <LandingPage />} />
              <Route exact path="/admin/login" render={() => <AdminLogin />} />
              <Route path="/editUser/:id" component={EditUserLoader} />
              <Route path="/deleteUser/:id" component={DeleteUser} />
              <Route exact path="/userEvents" component={UserEvents} />
              <Route path="/userEvents/:id" component={UserEvents} />
              <Route path="/evaluator" component={UserEvents} />
              <Route path="/participant" component={ParticipantHome} />
              <Route
                path="/register/:id/:description/:participant"
                component={RegisterForEvent}
              />
              <Route
                path="/teamEvents/:id"
                component={ParticipantEventDetails}
              />
              <Route path="/teamDetails/:id" component={TeamDetails} />

              <Route path="/addTeamMember/:id" component={AddTeamMember} />
              <Route path="/editTeam/:id" component={AddTeamMember} />
              <Route path="/error" component={ErrorPage} />
              <Route path="/event/:id/ideas" component={EventIdeas} />
              <Route path="/evaluateIdea" component={EvaluateIdea} />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </animated.div>
        );
      })}
    </div>
  );
});

export default AppRouter;
