import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
function Layout(props) {
  return (
    <React.Fragment>
      <Menu />
      {props.children}
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
