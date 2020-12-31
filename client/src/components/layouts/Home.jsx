import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const Home = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const history = useHistory();
  useEffect(() => {
    console.log("menu", isAuthenticated);
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);
  return <div className="site-layout-content">This is home page</div>;
};

export default Home;
