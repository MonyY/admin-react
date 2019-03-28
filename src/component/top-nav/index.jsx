import React from "react";
import { Link } from "react-router-dom";

class TopNav extends React.Component {
	constructor(props) {
		super(props);
  }
  
  onLogout() {
    console.log(1)
  }

	render() {
		return (
			<div className="navbar navbar-default top-navbar">
				<div className="navbar-header">
					<Link className="navbar-brand" to="/">
						<b>HAPPY</b>MALL
					</Link>
				</div>
				<ul className="nav navbar-top-links navbar-right">
					<li className="dropdown">
						<a
							className="dropdown-toggle"
							href="javascript:;"
						>
							<i className="fa fa-user fa-fw" />
              <span>你好,adminXXX</span>
              <i className="fa fa-caret-down" />
						</a>
						<ul className="dropdown-menu dropdown-user">
							<li>
								<a onClick={() => {this.onLogout()}}>
									<i className="fa fa-sign-out-alt fa-fw" />
                  <span>退出登陆</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
}

export default TopNav;
