import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";


function Admin() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const { user, setloadscreen, loadscreen, userroll, setuserroll } = useContext(UserContext);

    const data = [

        {
            jobrole: "Software Manager",
            jobAddress: "Fulfillment Center Services",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobspec: " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        }

    ]
    const [jobdata, setjobdata] = useState(data);


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

    function logout() {
        setloadscreen(true)
        try {
            sessionStorage.removeItem('Auth Token');
            setloadscreen(false)
            navigate('/login')
            toast.success("LogOut Successfully :)");
        } catch (error) {
            toast.error("Something Wrong. Try After Sometime")
            setloadscreen(false)
        }
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
                                navigate("/Approve")
                            }}
                            class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Add / Remove Hr
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
                            onClick={logout}
                            class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div class="font-bold text-2xl">List of Available Jobs</div>

            <div className="flex justify-center p-5">
                
                
                        
                    
                        <div className=" m-5 p-2 grid grid-cols-3 ">

                            {
                                jobdata.map((element, index) => {
                                    return (
                                        <div key={index} className="p-2">
                                            <div class="max-w-md rounded overflow-hidden shadow-lg border-[2px] border-blue-900">
                                    <div class="px-6 pt-4">
                                        <div class="font-bold text-2xl">{element.jobrole}</div>
                                    </div>
                                    <div className="px-6 pt-1">
                                        <p className="text-sm">{element.jobAddress}</p>
                                        <p className="text-sm">{element.jobmode}</p>
                                        <p className="text-sm font-bold pt-2">₹{element.jobsalary.from} - ₹{element.jobsalary.to} per year</p>
                                    </div>
                                    <div class="px-6 pt-4 pb-2">
                                        <p>{element.jobspec}</p>
                                    </div>
                                    <div className="px-6 pt-1 flex justify-center pb-4">
                                        <div>
                                            <button
                                                class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                        </div>
                                    )
                                })
                            }


                        </div>





                    </div>
            
        </div>
    )
}
export default Admin;