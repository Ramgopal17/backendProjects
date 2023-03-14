
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const About = () => {
  const location=useLocation()
  console.log(location.state)
  return (
    <>
    <div> i am About page my id is {location.state.id}</div>
    // <Link to="/">Home</Link><br />
    // <Link to="/contact">Contact us</Link>
    </>
  )
}

export default About