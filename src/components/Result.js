import React from "react"
import car from "../assets/car.png"
import Vehicles from "./Vehicles.js"
import { useState } from 'react';


export default function Result(props) {

    const [showModal, setShowModal] = useState(false);
    function handleClick() {
        console.log(showModal)
        setShowModal(!showModal)
        console.log(showModal)
    }
    
    function capitalizeFirstLetter(string) {
        return string.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
      }


    return (
        <>
            {showModal ? <Vehicles handleClick={handleClick} vehicles={props.vehicles} /> : ""}
            
            <article className="result">
                <div className="result-wrapper">
                    <h4 className="result_subheading result_text">Name: </h4><p className="result_text">{props.name}</p>
                    <h4 className="result_subheading result_text">Gender: </h4><p className="result_text">{props.gender === "n/a" ? "N/A" : capitalizeFirstLetter(props.gender)}</p>            
                    <h4 className="result_subheading result_text">Height: </h4><p className="result_text">{props.height} cm</p>
                    <h4 className="result_subheading result_text">Mass: </h4><p className="result_text">{props.mass === "unknown" ? "N/A" : props.mass + " kg"}</p>
                </div>
                
           
                <div className="show_vehicle" onClick={handleClick}>
                    <img src={car} alt="" className="car" />
                    <p className="show_vehicle_text">Show Vehicle</p>
                </div>
            </article>
        </>
    )
}