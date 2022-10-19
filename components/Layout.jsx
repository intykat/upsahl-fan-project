import React from "react";
import Visualizer from "./AudioVisualizer";  
import Head from "next/head";

const Header = (props) => {
  return (
    <>
    
    <nav>
        <h1>UPSAHL</h1>
        <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Stream</a></li>
            <li><a href="">About</a></li>
        </ul>
        <Visualizer />
    </nav>
    </>
  );
};
  
const Footer = () => {
  return <h3>This is Footer</h3>;
};
  
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <audio id='audio'></audio>
      {children}
      <Footer />
    </>
  );
};
  
export default Layout;