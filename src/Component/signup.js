import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './signup.css'
import { toast } from "react-toastify";
import Loading from "./Loading";
import validator from 'validator';
import { UserContext } from "../context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

toast.configure();

function Signup() {

    const Input = {
        email: "",
        username: "",
        password: "",
        mobilenumber: "",
        ConfirmPassword: "",
        role: ""
    }
    const auth = getAuth()
    const [SignupData, setSignupData] = useState(Input);
    const { setloadscreen, loadscreen } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/Home')
        }
        if (!authToken) {
            navigate('/signup')
        }
    }, []);


    function handleInputChange(e) {
        const { name, value } = e.target;
        setSignupData({
            ...SignupData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (SignupData.email.length === 0 ||
            SignupData.mobilenumber === 0 ||
            SignupData.username.length === 0 ||
            SignupData.password.length === 0 ||
            SignupData.ConfirmPassword.length === 0) {
            toast.error("All Fileds Are Required   :(")
            return;
        }
        if (!(validator.isEmail(SignupData.email))) {
            toast.error("Not a valid Email ID");
            setSignupData({
                ...SignupData,
                ["email"]: "",
            });
            return;
        }
        if (SignupData.mobilenumber.length < 10 || SignupData.mobilenumber.length > 10) {
            toast.error("Mobile Number must only contains 10 Values")
            return;
        }
        if (SignupData.username.length < 3) {
            toast.error("Username must contain more than three letters")
            return;
        }
        if (SignupData.password.length < 6) {
            toast.error("Password must contain more than 6 letters")
            return;
        }
        if (SignupData.password !== SignupData.ConfirmPassword) {
            toast.error("Password and Confirm must be same");
        }
        if (SignupData.role === "") {
            toast.error("Role must be specified")
            return;
        }
        setloadscreen(true);
        const data = {
            name: SignupData.username,
            email: SignupData.email,
            mobilenumber: SignupData.mobilenumber,
            password: SignupData.password,
            role: SignupData.role
        }
        createUserWithEmailAndPassword(auth, SignupData.email, SignupData.password)
            .then(async (userCredential) => {
                if (data.role === "Hr") {
                    await setDoc(doc(db, "HR", userCredential.user.uid), {
                        ...data,
                        id: userCredential.user.uid
                    });
                } else {
                    await setDoc(doc(db, "Users", userCredential.user.uid), {
                        ...data,
                        id: userCredential.user.uid,
                        appiledJob: []
                    });
                }
                toast.success("Account Created Successfully");
                setloadscreen(false);
                navigate("/Login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                setloadscreen(false);
                toast.error(`${errorMessage}`);
            });
    }

    return (
        <div className="signcontainer">
            {
                loadscreen ? <Loading /> : null
            }
            <div style={{ display: "flex", height: "100vh" }}>
                <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "75%", }}>

                    <h1 style={{ color: "black", fontSize: "60px" }} ><strong>Remote Hire</strong></h1>
                </div>
                <center style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", }}>
                    <div className="color" style={{ display: "flex", flexDirection: "column", padding: "30px", borderRadius: "25px" }}>

                        <h2 className='signup' style={{ color: "black", fontSize: "25px", }}>Sign Up</h2><br></br>
                        <div class="text">
                            <p>Please enter all your details to continue</p>
                        </div>
                        <form>
                            <div class="txt_field" id='Enter Email'>
                                <input
                                    onChange={handleInputChange}
                                    value={SignupData.email}
                                    type="text" name="email" required></input>
                                <span></span>
                                <label>Enter Email</label>
                            </div>
                            <div class="txt_field" id='Username'>
                                <input type="text"
                                    onChange={handleInputChange}
                                    value={SignupData.username}
                                    name="username" required></input>
                                <span></span>
                                <label>Enter Username</label>
                            </div>
                            <div class="txt_field" id='MobileNumber'>
                                <input type="number"
                                    onChange={handleInputChange}
                                    value={SignupData.mobilenumber}
                                    name="mobilenumber" required></input>
                                <span></span>
                                <label>Enter Mobile Number</label>
                            </div>
                            <div class="txt_field" id='Paasword' >
                                <input type="password"
                                    onChange={handleInputChange}
                                    value={SignupData.password}
                                    name="password" required />
                                <span></span>
                                <label>Password</label>
                            </div>
                            <div class="txt_field" id='Confirm Password'>
                                <input
                                    onChange={handleInputChange}
                                    value={SignupData.ConfirmPassword}
                                    type="password" name="ConfirmPassword" required></input>
                                <span></span>
                                <label>Confirm Password</label>
                            </div>

                            <div>
                                <input type="radio"
                                    onClick={handleInputChange}
                                    value="Employee"
                                    checked={SignupData.role === "Employee"}
                                    name="role" /> Employee
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input type="radio"
                                    onClick={handleInputChange}
                                    checked={SignupData.role === "Hr"}
                                    value="Hr" name="role" /> HR

                            </div><br />
                            <input type="submit"
                                onClick={handleSubmit} value="Sign up"></input><br /><br />
                            <div class="signup_link">
                                Have an account?< Link to="/login">sign in </Link>
                            </div>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    );
}
export default Signup;
