import React from "react";
import { Link } from "react-router-dom";

function Menu(props) {
  function logOutHandle() {
    localStorage.removeItem("userData");
    window.location.replace("/");
  }
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              {" "}
              <Link to="/home">
                <a className="sidebar-link sidebar-link" href="#">
                  <i data-feather="home" className="feather-icon"></i>
                  <span className="hide-menu">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="list-divider"></li>

            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>
            <li className="sidebar-item">
              {" "}
              <Link to="/products">
                <a className="sidebar-link sidebar-link" href="#">
                  <i data-feather="settings" className="feather-icon"></i>
                  <span className="hide-menu">Products</span>
                </a>
              </Link>
            </li>
            <li className="sidebar-item" onClick={logOutHandle}>
              {" "}
              <a className="sidebar-link sidebar-link">
                <i data-feather="settings" className="feather-icon"></i>
                <span className="hide-menu">Log out</span>
              </a>
            </li>
            {/* <li className="sidebar-item">
              {" "}
              <a className="sidebar-link sidebar-link" href="/chat">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Chat</span>
              </a>
            </li> */}
            {/* <li className='sidebar-item'>
							{' '}
							<a
								className='sidebar-link has-arrow'
								href='#'
								aria-expanded='false'>
								<i data-feather='grid' className='feather-icon'></i>
								<span className='hide-menu'>Tables</span>
							</a>
							<ul
								aria-expanded='false'
								className='collapse  first-level base-level-line'>
								<li className='sidebar-item'>
									<a href='/users' className='sidebar-link'>
										<span className='hide-menu'>
											Users
										</span>
									</a>
								</li>
								<li className='sidebar-item'>
									<a href='/products' className='sidebar-link'>
										<span className='hide-menu'>
											Products
										</span>
									</a>
								</li>
								<li className='sidebar-item'>
									<a href='/history' className='sidebar-link'>
										<span className='hide-menu'>
											History
										</span>
									</a>
								</li>
							</ul>
						</li> */}

            <li className="list-divider"></li>
            {/* <li className='nav-small-cap'>
							<span className='hide-menu'>Authentication</span>
						</li>

						<li className='sidebar-item'>
							{' '}
							<a
								className='sidebar-link sidebar-link'
								href='authentication-login1.html'
								aria-expanded='false'>
								<i data-feather='lock' className='feather-icon'></i>
								<span className='hide-menu'>Login</span>
							</a>
						</li>
						<li className='sidebar-item'>
							{' '}
							<a
								className='sidebar-link sidebar-link'
								href='authentication-register1.html'
								aria-expanded='false'>
								<i data-feather='lock' className='feather-icon'></i>
								<span className='hide-menu'>Register</span>
							</a>
						</li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
