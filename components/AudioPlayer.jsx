import React, { useState, useEffect } from 'react'

export default function Audio(){

    useEffect(() => {

    })

    return(
        <div className="audio-player-container">
            <audio src="" preload="metadata" loop></audio>
            <p>Ritual (Distylpix)</p>
            <button className="play-icon"></button>
            <span className="current-time time">0:00</span>
            <input type="range" id="seek-slider" max="100" defaultValue="0" />
            <span className="duration time">0:00</span>
            <output className="volume-output">100</output>
            <input type="range" id="volume-slider" max="100" defaultValue="100" />
            <button className="mute-icon"></button>
        </div>
    )
}