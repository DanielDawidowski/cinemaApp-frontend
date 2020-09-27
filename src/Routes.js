import React from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AdminRoute from "./auth/AdminRoute";

import Cart from "./components/Cart";
import Hall from "./components/Hall";
import Movie from "./components/Movie";
import City from "./components/City";
import AdminDashboard from "./admin/adminDashboard";
import AddCity from "./admin/AddCity";
import AddHalls from "./admin/AddHalls";
import AddMovie from "./admin/AddMovie";
import AddPlayTime from "./admin/AddPlayTime";
import ManageMovies from "./admin/ManageMovies";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";

const Routes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/city/:cityId" exact component={City} />
        <Route path="/movie/:movieId" exact component={Movie} />
        <Route path="/hall/:hallId" exact component={Hall} />
        <Route path="/cart" exact component={Cart} />
        <AdminRoute path="/create/city" exact component={AddCity} />
        <AdminRoute path="/create/hall/:cityId" exact component={AddHalls} />
        <AdminRoute path="/create/movie" exact component={AddMovie} />
        <AdminRoute
          path="/create/playTime/:movieId"
          exact
          component={AddPlayTime}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/movies" exact component={ManageMovies} />
      </Switch>
    </AnimatePresence>
  );
};

const RoutesWrapper = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default RoutesWrapper;
