import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Audio from '../components/AudioPlayer'
import React, { useState, useEffect } from 'react'

export default function Home() {

  return (
    <div>
      <div id='splash'>
        <h1>UPSAHL</h1>
        <Audio poster='/album/ritual.jpg' name='Ritual (dislyte)' src='/audio/ritual.mp3' />
        <p>Latest Release</p>
        <div id='upsahlShot'>
          
        </div>
        <div id='wave1' className='wave'></div>
        <div id='wave2' className='wave'></div>
        <div id='wave3' className='wave'></div>
        <div id='wave4' className='wave'></div>

      </div>
      <div id='driveBys'>
        
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="People I Don't Like" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        <Audio poster='/album/ppidl.PNG' name="other song" src='/audio/ppidl.mp3' />
        
      </div>
    </div>
  )
}
