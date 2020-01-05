export const backClick = (isAdmin, push, routeAdmin, routeUser) => {
  let backRoute = '/';
  isAdmin ? (backRoute = routeAdmin) : (backRoute = routeUser);
  push(backRoute);
};
