import { useContext, useEffect, useRef } from "react";

import "./css/header.css"
import { AuthContext } from "./utils/AuthContext"
import { Link } from "react-router-dom";

function Navbar() {

	const { user: authUser, logoutUser } = useContext(AuthContext);

	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<>
			<header>
				<h5 className=""> {authUser ? `Logged in as ${authUser.username}` : ''}</h5>
				<nav ref={navRef}>
					{!authUser ? (
						<>
							<div className="logo"><Link to="/"><p className="logo-collor">Earthly Explorers</p></Link></div>

							<ul>
								<li><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
							
								
								<li><Link to="/login"><i className="fa fa-sign-in"></i>Login</Link></li>
								<li className="register-btn"><Link to="/signup"><i className="fa fa-pencil-square-o"></i>Register</Link></li>
							</ul>
						</>
					) : (
						<>

							<div className="logo"><Link to="/"><p className="logo-collor">Earthly Explorers</p></Link></div>
							<ul>
								<li className="link"><Link to="/explore"><i className="fas fa-search"></i>Explore</Link></li>
								<li className="link"><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
								
								
								<li className="link"><Link to="/dashboard"><i className="fas fa-cogs"></i>Dashboard</Link></li>
								<li className="link"><Link to="" onClick={logoutUser}><i className="fas fa-sign-out" ></i>Logout</Link></li>
							</ul>
						</>
					)}
				</nav>
			</header>
		</>
	);
}

export default Navbar;