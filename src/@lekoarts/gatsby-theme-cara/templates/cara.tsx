import React, {useState, useEffect} from "react"
import type { HeadFC } from "gatsby"
import { window, exists } from "browser-monads"
import { Parallax } from "@react-spring/parallax"
import Layout from "@lekoarts/gatsby-theme-cara/src/components/layout"
import Hero from "@lekoarts/gatsby-theme-cara/src/components/hero"
import Projects from "@lekoarts/gatsby-theme-cara/src/components/projects"
import About from "@lekoarts/gatsby-theme-cara/src/components/about"
import Contact from "@lekoarts/gatsby-theme-cara/src/components/contact"
import Seo from "@lekoarts/gatsby-theme-cara/src/components/seo"

const Cara = () => {

  const { pages, projectsOffset, projectsFactor, aboutOffset, aboutFactor, contactOffset, contactFactor, width, height} = useWindowWidth();

  return(
    <Layout>
      <Parallax pages={pages}>
        <Hero offset={0} factor={1} />
        <Projects offset={projectsOffset} factor={projectsFactor} />
        <About offset={aboutOffset} factor={aboutFactor} />
        <Contact offset={contactOffset} factor={contactFactor} />
      </Parallax>
      {/* <p>Window width: {width}</p>
      <p>Window height: {height}</p> */}
    </Layout>
  )
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  let breakpoints = {
    pages: 5, 
    projectsOffset: 1, 
    projectsFactor: 2, 
    aboutOffset:3, 
    aboutFactor: 1,
    contactOffset:4, 
    contactFactor: 1,
    width: width,
    height: height
  };

  if(exists(window)){
    useEffect(() => {

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  
    switch (true) {
      case (width <= 400):
        breakpoints.pages = 9.5;
  
        breakpoints.projectsOffset = 1.5;
        breakpoints.projectsFactor = 5;
  
        breakpoints.aboutOffset = 6.5;
        breakpoints.aboutFactor = 2;
  
        breakpoints.contactOffset = 8.5;
        breakpoints.contactFactor = 1;
        break;
      case (width <= 600):
        breakpoints.pages = 7;
  
        breakpoints.projectsOffset = 1.5;
        breakpoints.projectsFactor = 4;
  
        breakpoints.aboutOffset = 5.5;
        breakpoints.aboutFactor = 1;
  
        breakpoints.contactOffset = 6.5;
        breakpoints.contactFactor = 0.5;
        break;
      case (width <= 900):
        //using the default
        break;
      case (width <= 1200):
        //using the default
        break;
      case (width > 1600):
        //using the default
        break;
    }
  }
  
  // console.log("breakpoints", breakpoints.pages, breakpoints.projectsOffset, breakpoints.projectsFactor, breakpoints.aboutOffset, breakpoints.aboutFactor)

  return breakpoints;
}

export default Cara

export const Head: HeadFC = () => <Seo />