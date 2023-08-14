import React from "react";

export const Layout = () => {
    return (
        <>
          <div className="row">
            <div className="col-md-3 sidebar">
              <div className="logo">
                <h6>JOB PORTAL</h6>
              </div>
              <hr />
              <p className="text-center text-warning">Welcome : username</p>
              <hr />
              <div className="menu">
                {sidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  );
                })}
                <div className={`menu-item `} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/login">Logout</Link>
                </div>
              </div>
            </div>
    
            <div className="col-md-9">{children}</div>
          </div>
        </>
      );
}