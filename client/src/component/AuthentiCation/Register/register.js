import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function Register() {
    const navigate = useNavigate();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();


    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisibility, setVisibility] = useState(false);


    const handleValidation = () => {

        if (username.length < 4) {
            alert("username must be of at least 4 charactre");
            return false;
        } else if (password !== confirmPassword) {
            alert("password and confirmation of password must be same");
            return false;
        } else if (password.length < 5) {
            alert("passwor must be at least 5 character");
            return false;
        } else if (email === "") {
            alert("email is required");
            return false;
        }
        return true;
    }
    const handleRegister = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post("/user/register", {
                    email,
                    username,
                    password,
                }, config);
                console.log("registration successul");
                localStorage.setItem("chatapp-user", JSON.stringify(data));
                setIsLoading(false);
                navigate("/user/chat");
            } catch (error) {
                console.log(error.message);
            }

        }


    }

    return (<>
        <form className='register'>
            <input type='email' placeholder='email' id='email' autoComplete='off' name='email' onChange={(e) => setEmail(e.target.value)} />
            <input type='text' placeholder='username' id='userNameRegister' autoComplete='off' name='username' onChange={(e) => setUserName(e.target.value)} />
            <input type={passwordVisibility ? 'text' : 'password'} placeholder='password' id='passwordRegister' autoComplete='off' name='password' onChange={(e) => setPassword(e.target.value)} />
            <input type={passwordVisibility ? 'text' : 'password'} placeholder='confirm password' autoComplete='off' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} />
            {/* <span>Upload profile picture</span> */}
            {/* <input type='file' id='picInput' accept='image/' onChange={(e) => postFile(e.target.files[0])} name='pic' placeholder='upload profile pic' /> */}
            <div className='CheckBox'>
                <span><input type='checkbox' onClick={() => { setVisibility(!passwordVisibility) }} id='checkBox' /></span><span>show password</span>
            </div>
            <button type='submit' id='registerButton' isLoading={isLoading} onClick={(event) => handleRegister(event)}>Register</button>
            <span>Already Have an account?<Link to="/login" id="login">Log-in</Link></span>
        </form>
    </>)
}
export default Register;

