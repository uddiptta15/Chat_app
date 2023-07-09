import React from 'react';
import "./homescreen.css";
import {
  Link,
  Outlet,
} from "react-router-dom";

function HomeScreen() {
  return (<>
    <div className='homeScreen'>
      <div className='navBar'>
        <div className='navHeader'>
          <span><h1>WChat</h1></span>
          <span><h2>Here You Go!</h2></span>
        </div>
        <ul className='LR'>
          <li>
            <Link id='login' to='/user/login'>Log-In</Link>
          </li>
          <li>
            <Link id='register' to='/user/register'>Register</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  </>)
}

export default HomeScreen;