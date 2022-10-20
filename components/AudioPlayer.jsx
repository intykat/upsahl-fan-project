import React, { useState, useEffect } from 'react'

export default function Audio(props){

    function loadAudio(){
        document.getElementById('audio').src = props.src
        const element = document.getElementById(props.audio).parentElement;
        const audio = document.getElementById('audio');

        const audioPlayerContainer = element.getElementsByClassName('audio-player-container')[0];
        const playIconContainer = element.getElementsByClassName('play-icon')[0];
        const seekSlider = element.getElementsByClassName('seek-slider')[0];
        const durationContainer = element.getElementsByClassName('duration')[0];
        const currentTimeContainer = element.getElementsByClassName('current-time')[0];

        let playState = 'play';
        let raf = null;

        const whilePlaying = () => {
            seekSlider.value = Math.floor(audio.currentTime);
            currentTimeContainer.textContent = calculateTime(seekSlider.value);
            audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
            raf = requestAnimationFrame(whilePlaying);
        }
    
        const showRangeProgress = (rangeInput) => {
            if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
        }
    
        const calculateTime = (secs) => {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        }
            
        const displayDuration = () => {
            durationContainer.textContent = calculateTime(audio.duration);
        }
            
        const setSliderMax = () => {
            seekSlider.max = Math.floor(audio.duration);
        }
            
        const displayBufferedAmount = () => {
            //const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
            //audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
        }
    
        if (audio.readyState > 0) {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
            audio.play();
            playIconContainer.classList.add('pause')
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.addEventListener('loadedmetadata', () => {
                displayDuration();
                setSliderMax();
                displayBufferedAmount();
                audio.play();
                playIconContainer.classList.add('pause')
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            });
        }
    
        playIconContainer.addEventListener('click', () => {
            if(playState === 'play') {
                playIconContainer.classList.add('pause')
                audio.play();
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                audio.pause();
                cancelAnimationFrame(raf);
                playState = 'play';
                playIconContainer.classList.remove('pause')
            }
        });
    
        audio.addEventListener('progress', displayBufferedAmount);
    
        seekSlider.addEventListener('input', (e) => {
            showRangeProgress(e.target);
            currentTimeContainer.textContent = calculateTime(seekSlider.value);
            if(!audio.paused) {
                cancelAnimationFrame(raf);
            }
        });
    
        seekSlider.addEventListener('change', () => {
            audio.currentTime = seekSlider.value;
            if(!audio.paused) {
                requestAnimationFrame(whilePlaying);
            }
        });
    
        if('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: props.audio,
                artist: 'Upsahl',
                artwork: [
                    { src: '/upsahl.PNG', sizes: '96x96', type: 'image/png' },
                    { src: '/upsahl.PNG', sizes: '128x128', type: 'image/png' },
                    { src: '/upsahl.PNG', sizes: '192x192', type: 'image/png' },
                    { src: '/upsahl.PNG', sizes: '256x256', type: 'image/png' },
                    { src: '/upsahl.PNG', sizes: '384x384', type: 'image/png' },
                    { src: '/upsahl.PNG', sizes: '512x512', type: 'image/png' }
                ]
            });
            navigator.mediaSession.setActionHandler('play', () => {
                if(playState === 'play') {
                    audio.play();
                    requestAnimationFrame(whilePlaying);
                    playIconContainer.classList.add('pause')
                    playState = 'pause';
                } else {
                    audio.pause();
                    cancelAnimationFrame(raf);
                    playIconContainer.classList.remove('pause')
                    playState = 'play';
                }
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                if(playState === 'play') {
                    audio.play();
                    requestAnimationFrame(whilePlaying);
                    playState = 'pause';
                    playIconContainer.classList.add('pause')
                } else {
                    audio.pause();
                    cancelAnimationFrame(raf);
                    playState = 'play';
                    playIconContainer.classList.remove('pause')
                }
            });
            navigator.mediaSession.setActionHandler('seekbackward', (details) => {
                audio.currentTime = audio.currentTime - (details.seekOffset || 10);
            });
            navigator.mediaSession.setActionHandler('seekforward', (details) => {
                audio.currentTime = audio.currentTime + (details.seekOffset || 10);
            });
            navigator.mediaSession.setActionHandler('seekto', (details) => {
                if (details.fastSeek && 'fastSeek' in audio) {
                  audio.fastSeek(details.seekTime);
                  return;
                }
                audio.currentTime = details.seekTime;
            });
            navigator.mediaSession.setActionHandler('stop', () => {
                audio.currentTime = 0;
                seekSlider.value = 0;
                audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
                currentTimeContainer.textContent = '0:00';
                if(playState === 'pause') {
                    playIconContainer.classList.remove('pause')
                    cancelAnimationFrame(raf);
                    playState = 'play';
                }
            });
        }
    }

    return(
        <div id={props.audio} className="audio-player-container">
            <p>{props.audio || '...'}</p>
            <button onClick={loadAudio} className="play-icon"></button>
            <input type="range" className="seek-slider" max="100" defaultValue="0" />
            <span className="current-time time">0:00</span>
            <span className="duration time">0:00</span>
        </div>
    )
}