import React from "react";
import { Icon } from 'semantic-ui-react';

const Sidebar = ({ menuItems, styles }) => {
  const sidebarStyle = {
    height: "100vh",
    width: styles.sidebarWidth,
    position: "fixed",
    backgroundColor: "#333",
    paddingTop: 40
  };

  const menuItemStyle = {
    marginBottom: 20,
    cursor: 'pointer',
    display: "flex",
    justifyContent: styles.sidebarCollapsed ? "center" : "flex-start",
    alignItems: "center",
    padding: `4px ${styles.sidebarCollapsed ? 0 : 10}px`,
    color: styles.white(0.9)
  };

  const iconStyle = {
    fontSize: 26,
    marginRight: styles.sidebarCollapsed ? 0 : 10
  };

  const logoStyle = {
    textAlign: "center",
    color: styles.white(),
    fontSize: 34,
    marginBottom: 60,
    fontWeight: "bold"
  };

  return (
    <div style={sidebarStyle}>
      <div style={logoStyle}>{styles.sidebarCollapsed ? "A" : "App"}</div>
      {menuItems.map((item, i) => (
        <div key={i} style={menuItemStyle} onClick={item.handleClick}>
          <span style={iconStyle}><Icon name={item.icon}/></span>
          {!styles.sidebarCollapsed && item.text}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
