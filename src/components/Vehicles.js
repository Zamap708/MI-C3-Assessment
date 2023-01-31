import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Vehicles(props) {

    const [fadeOut, setFadeOut] = useState(false);
    const [loading, setLoading] = useState(true);
    const [vehicleData, setVehicleData] = useState([]);
    
    function hideModal() {
        setFadeOut(!fadeOut)
    }
    const vehicleLinks = props.vehicles;
    
    //similar to useEffect in App, maps through array of links and requests all entries concurrently with Promise.all()
    useEffect(() => {
        async function fetchData() {
            const requests = vehicleLinks.map(link => axios.get(link));
            const responses = await Promise.all(requests);
            const vehicles = responses.map(res => res.data);
            setVehicleData(vehicles);
            setLoading(false);

        }
        fetchData();
    }, [props]);

   
    function capitalizeFirstLetter(string) {
        return string.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
      }
         

    console.log(vehicleData)
    return (
        
        <div
            className={ "modal fade-in " + (fadeOut ? "fade-out" : " ") }
            onClick={() => {
                hideModal();
                setTimeout(() => {
                    props.handleClick()
                }, 500);
            }}
        >
        
            <div className="modal_content "
                onClick={(e) => e.stopPropagation()}
            >
                {loading ?
                    <div className="modal_content_loading strobe"></div> :
                        
                                <>
                                <h1 className="modal_title">Vehicles</h1>
                        {vehicleData.length === 0 ?
                            <div className="loading-text center">No Vehicles Found</div>
                             :
                                
                            <div className="vehicle-wrapper">
                                {vehicleData.map(vehicle => (
                                    <div className="vehicle" key={vehicle.name}>
                                        <h2 className="modal_text">{capitalizeFirstLetter(vehicle.name)}</h2>
                                        
                                        <div className="modal_info">
                    
                                            <h4 className="modal_subheading modal_text">Model:</h4><p className="modal_text">{capitalizeFirstLetter(vehicle.model)}</p>
                                            <h4 className="modal_subheading modal_text">Manufacturer:</h4><p className="modal_text">{capitalizeFirstLetter(vehicle.manufacturer)}</p>
                                            <h4 className="modal_subheading modal_text">Vehicle Class:</h4><p className="modal_text">{capitalizeFirstLetter(vehicle.vehicle_class)}</p>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>}
                            </>}
            </div>
            
        </div>
    
    );
    
}
