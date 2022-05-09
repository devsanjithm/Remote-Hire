import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../style.css';
import { toast } from "react-toastify";
import Loading from "./Loading";
import validator from 'validator';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../context";
import { db, signOut } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

toast.configure();

function Login() {

    const Input = {
        email: "",
        password: "",
        role: ""
    }
    const auth = getAuth()
    const [LoginData, setLoginData] = useState(Input);
    const { user, setUser, setloadscreen, loadscreen, userroll, setuserroll } = useContext(UserContext);
    const navigate = useNavigate();



    function handleInputChange(e) {
        const { name, value } = e.target;
        setLoginData({
            ...LoginData,
            [name]: value,
        });
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        let role = localStorage.getItem('role')
        console.log(authToken);
        if (authToken) {
            if (role === "Hr") {
                navigate("/hrhome")
            } else if (role === "Employee") {
                navigate("/home")
            }
        }
        if (!authToken) {
            navigate('/Login')
        }
    }, []);


    function handleSubmit(e) {
        e.preventDefault();
        if (LoginData.email.length === 0 ||
            LoginData.password.length === 0) {
            toast.error("All Fileds Are Required   :(")
            return;
        }
        if (!(validator.isEmail(LoginData.email))) {
            toast.error("Not a valid Email ID");
            setLoginData({
                ...LoginData,
                ["email"]: "",
            });
            return;
        }

        if (LoginData.password.length < 6) {
            toast.error("Password must contain more than 6 letters")
            return;
        }
        if (LoginData.role === "") {
            if (LoginData.email !== "admin@remotehire.com") {
                toast.error("Role must be specified")
                return;
            }
        }
        setloadscreen(true);
        if (LoginData.email === "admin@remotehire.com" && LoginData.password === "123456") {
            sessionStorage.setItem('Auth Token', "65fefd65c4d84d6sa1xad6wf8e6fe");
            navigate("/admin");
            return;
        }
        signInWithEmailAndPassword(auth, LoginData.email, LoginData.password)
            .then(async (userCredential) => {
                const docRef = doc(db, LoginData.role === "Hr" ? "HR" : "Users", userCredential.user.uid);
                const docSnap = await getDoc(docRef);
                if (LoginData.role === docSnap.data().role) {
                    setUser(userCredential.user)
                    localStorage.setItem("UserData", userCredential.user);
                    localStorage.setItem('role', LoginData.role)
                    toast.success("Logged in Successfully");
                    sessionStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken);
                    localStorage.setItem('uid', userCredential.user.uid)
                    if (LoginData.role === "Hr") {
                        navigate("/hrhome")
                    } else {
                        navigate("/home")
                    }
                    setloadscreen(false);
                } else {
                    toast.error("Choose Correct role")
                    signOut(auth).then((res) => {
                        console.log(res);
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                setloadscreen(false);
                if (errorCode === "auth/user-not-found") {
                    toast.error("Email not found. Create new account");
                } else {
                    toast.error("Invalid Credentials");
                }
            });
    }

    return (
        <div className="signcontainer">
            {
                loadscreen ? <Loading /> : null
            }
            <div style={{ display: "flex", height: "100vh" }}>
                <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "75%", }}>
                    <h1 style={{ color: "black", fontSize: "60px", }} ><strong>Remote Hire</strong></h1>
                </div>
                <center style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", width: "50%", }}>
                    <div className="colors" style={{ display: "flex", flexDirection: "column", padding: "50px", borderRadius: "10px" }}>

                        <h2 style={{ color: "black", fontSize: "25px" }}>Login</h2><br></br>
                        <div class="text">
                            <p>Please sign in to continue</p>
                        </div>

                        <form method="post">
                            <div class="txt_field" id='email'>
                                <input
                                    onChange={handleInputChange}
                                    value={LoginData.email}
                                    name="email"
                                    type="text" required></input>
                                <span></span>
                                <label>Email or username</label>
                            </div>
                            <div class="txt_field" id='password'>
                                <input type="password"
                                    onChange={handleInputChange}
                                    name="password"
                                    value={LoginData.password}
                                    required></input>
                                <span></span>
                                <label>Password</label>
                            </div>
                            <div >
                                <input
                                    onClick={handleInputChange}
                                    type="radio"
                                    value="Employee"
                                    name="role" /> Employee
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input
                                    type="radio"
                                    onClick={handleInputChange}
                                    value="Hr"
                                    name="role" /> HR
                            </div>
                            <br />
                            < input
                                onClick={handleSubmit}
                                type="submit" value="Login" classname="login"></input>
                            <div class="signup_link">
                                New here?<Link to="/signup">Click to signup</Link>
                            </div>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    );
}

export default Login;
