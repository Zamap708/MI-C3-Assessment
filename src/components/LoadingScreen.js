import React from "react";

export default function LoadingScreen() {

    return (
        <div className="loading-container">
            <div >
                <h1 className="loading-text strobe">loading<span className="dot-1 balls">.</span><span className="dot-2 balls">.</span><span className="dot-3 balls">.</span></h1>
            </div>
        </div>
    )
}