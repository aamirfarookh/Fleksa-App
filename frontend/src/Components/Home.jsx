import React from 'react'
import {Link} from "react-router-dom"

import "../Components/syles/Home.css";
function Home() {
 const  style= { width: "200px", height: "150px" }
  return (
    <div className='home'>
      <h1>Home</h1>
      <nav>
        <img src='https://static.vecteezy.com/system/resources/previews/007/500/121/original/food-delivery-icon-clip-art-logo-simple-illustration-free-vector.jpg' alt='img'  style={style} />
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}


export default Home
