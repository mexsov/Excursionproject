import { AuthContext } from "./utils/AuthContext"
import { useContext, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import './css/homepage.css';
import img1 from "../assets/visiter-vilnius-incontournables.jpg";

export const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="container">
                <div className="content">
                    <h1 className="anim">Start </h1>
                    <h1 className="anim">Team Work</h1>
                    <p className="anim">Collaborative effort of a group to achieve a common goal or <br></br>to
                        complete a task in an effective and efficient way !</p>
                    {!user && <a href="/signup" className="pgr-btn anim">Join now</a>}
                </div>
                <div className="div-img">
                    <img src={img1} alt="city" className="feature-img anim" />

                </div>

            </div>
        </>
    )
}