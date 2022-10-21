import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Audio from '../components/AudioPlayer'

export default function Home() {
  return (
    <div>
      This is a bunch of content hahahaha
      <Audio poster='/album/ritual.jpg' name='Ritual (dislyte)' src='/audio/ritual.mp3' />
      <Audio poster='/album/ppidl.PNG' name="People I Don't Like" src='/audio/ppidl.mp3' />
    </div>
  )
}
