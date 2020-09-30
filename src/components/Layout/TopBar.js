import React from "react";
import { Icon } from 'semantic-ui-react';

const TopBar = ({ styles, logout, profile }) => {
  const topBarStyle = {
    position: "fixed",
    top: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: styles.topBarHeight,
    backgroundColor: styles.white(),
    borderBottom: `1px solid ${styles.black(0.1)}`,
    fontWeight: "bold",
    padding: "0px 20px",
    boxSizing: "border-box",
    zIndex: 1
  };

  return (
    <div style={topBarStyle}>
      <span><Icon name='user' onClick={profile}/></span>
      Kpop Trade
      <span><Icon name='log out' onClick={logout}/></span>
    </div>
  );
};

export default TopBar;