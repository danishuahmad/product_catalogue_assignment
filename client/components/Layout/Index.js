import React from 'react';
import Products from '../Products/Index';

class Layout extends React.Component{
	render(){
		return[
			<nav key={"header"} className="navbar guest-header" role="navigation" aria-label="main navigation">
				<div className="navbar-brand">
					<a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
						<span aria-hidden="true"/>
						<span aria-hidden="true"/>
						<span aria-hidden="true"/>
					</a>
				</div>
				
				<div className="navbar-menu">
					<div className="navbar-start">
						<a className="navbar-item">Products Page</a>
					</div>
					
					<div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<div className="wq-btn">
									<a href="login.html" className="button login-btn">Log in</a>
									<a href="signup.html" className="button signup-btn">Sign up</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>,
			<section key={"content"} className="section">
				<Products/>
			</section>
		]
	}
}

export default Layout;