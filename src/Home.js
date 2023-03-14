
import React from 'react'
import { Link,useNavigate} from 'react-router-dom'

const Home = () => {
    const id=6 // how can i use this var in about page from home component for this we use useLocation hook 
    const navigate=useNavigate()
  function goTOAbout(){
navigate("/about",{state:{id:id}})
  }
  return (
    <>
    <div>Home</div>
//   <Link to="/about">About</Link><br />
//   <Link to="/contact">Contact us</Link>
<button onClick={goTOAbout}>About</button>
  </>
  )
}

export default Home