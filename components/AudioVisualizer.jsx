import React, { useState, useEffect } from 'react'
import { Wave } from '@foobar404/wave';

export default function Visualizer(){
    useEffect(() => {
        const canvas = document.getElementById('musicVisualizer');
        const audio = document.getElementById('audio')

        const wave = new Wave(audio, canvas);
        
        wave.addAnimation(new wave.animations.Lines({
            lineWidth: 10,
            lineColor: "red",
            count: 20
        }));
    })

    return (
    <canvas id='musicVisualizer'>

    </canvas>
    );
}