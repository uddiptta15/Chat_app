import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordVisibility, setVisibility] = useState(false);

    const handleValidation = () => {

        if (password.length === "") {
            alert("password required");
            return false;
        } else if (email.length === "") {
            alert("email required");
            return false;
        }
        return true;
    }
    const handleLogin = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                const { data } = await axios.post("/user/login", {
                    email,
                    password,
                }, config);

                if (data.status === false) {
                    return alert("Incorrect Credentials");
                }
                if (data.status === true) {

                    localStorage.setItem("chatapp-user", JSON.stringify(data));
                    return navigate("/user/chat");
                }
            } catch (error) {
                alert("something went wrong", error.message);
            }

        } else {
            alert("please fill all required");
        }


    }

    return (<>
        <form className='LogIn'>
            <input type='email' placeholder='email' id='email' onChange={(e) => setEmail(e.target.value)} />
            <input type={passwordVisibility ? 'text' : 'password'} placeholder='password' id='passwordRegister' onChange={(e) => setPassword(e.target.value)} />
            <div className='CheckBox'>
                <span><input type='checkbox' onClick={() => { setVisibility(!passwordVisibility) }} id='checkBox' /></span><span>show password</span>
            </div>
            <button type='submit' id='loginButton' onClick={(e) => handleLogin(e)}>Log in</button>
            <span>Not registered? <Link to="/register" id="register">Register</Link></span>
        </form>
    </>)
}
export default LogIn;
