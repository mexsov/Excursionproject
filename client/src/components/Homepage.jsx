import { AuthContext } from "./utils/AuthContext";
import { useContext, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import "./css/homepage.css";
import img1 from "../assets/visiter-vilnius-incontournables.jpg";
import img2 from "../assets/solotravel.jpg";
import img3 from "../assets/grouptravel.jpg";

import { Card } from "./card";
import { Excursion } from "./createExcursion/excursion";

export const Home = () => {
  // const { user } = useContext(AuthContext);

  return (
    <>
      <div className="container">
        <div className="content">
          <h1 className="anim">Start Your Explore in Vilnius</h1>

          <p className="anim">
            Whether you’re an avid traveller or a talented professional, we’re
            here to help you make the most of your time in Vilnius.
          </p>
        </div>
        <div className="div-img">
          <img src={img1} alt="city" className="feature-img anim" />
        </div>
        <div className="main_page_card_container">
         
         
          <div class="container_card_a">

          <a href="/signup" className="pgr-btn anim">Book excursion for solo</a>
            
            <div class="card" >
              
              <img src={img2} alt="city" className="feature-img anim" />
            </div>
            </div>
            <div class="container_card_b">
             <div class="card">   
                
              <a href="/signup" className="pgr-btn anim">Book excursion for group</a>
            
              = <img src={img3} alt="city" className="feature-img anim" />
            
              

             
            </div>
            
            
          </div>
          <Excursion/>
          <Card />
        </div>
      </div>
    </>
  );
};
