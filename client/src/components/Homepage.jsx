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
                    <h1 className="anim">Start Your Explore in Vilnius</h1>
                   
                    <p className="anim">Whether you’re an avid traveller or a talented professional, we’re here to help you make the most of your time in Vilnius.</p>
                    
                </div>
                <div className="div-img">
                    <img src={img1} alt="city" className="feature-img anim" />
                </div>
                <div className="main_page_card">
                    <li>Excursion for solo travellers</li>
                <li>Excursion for group travellers</li>
                </div>
            </div>
        </>
    )
}