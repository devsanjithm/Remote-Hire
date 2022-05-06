import React, { useState,useEffect,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context";
import { toast } from "react-toastify";
import { auth, signOut } from "../firebase";
function HrHome() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const { user, setloadscreen, loadscreen, userroll, setuserroll } = useContext(UserContext);

    
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken === "65fefd65c4d84d6sa1xad6wf8e6fe") {
            navigate("/admin")
        }else{
            const role = localStorage.getItem("role");
            if(role === "Hr"){  
                navigate("/hrhome")
            }else{
                navigate("/home")
            }
        }
        if (!authToken) {
            navigate('/Login')
        }
    }, []);
    
    function Logout() {
        signOut(auth).then(() => {
            sessionStorage.removeItem('Auth Token');
            navigate('/login')
            toast.success("LogOut Successfully :)");
        }).catch((error) => {
            toast.error("Something Wrong. Try After Sometime")
        });
    }

    return (
        <div>

            <div class="container px-4 mx-auto md:flex md:items-center bg-slate-100 p-5 mb-5">

                <div class="flex justify-between items-center">
                    <a href="#" class="font-bold text-4xl text-indigo-600">Remote Hire</a>
                </div>

                <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >
                        <button
                            onClick={() => {
                                navigate("/hrpage")
                            }}
                            class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Add Jobs
                        </button>
                    </div>
                    {/* <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >
                        <button

                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Appiled Jobs
                        </button>
                    </div> */}

                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >

                        <button
                            onClick={Logout}
                            class="bg-red-600 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HrHome;