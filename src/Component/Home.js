import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { auth, signOut } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";


function Home() {

    const { user, setloadscreen, loadscreen } = useContext(UserContext);
    const navigate = useNavigate();
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
            jobspec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            jobrole: "Software Manager",
            jobAddress: "Fulfillment Center Services",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobspec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            jobrole: "Software Manager",
            jobAddress: "Fulfillment Center Services",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobspec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            jobrole: "Software Manager",
            jobAddress: "Fulfillment Center Services",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobspec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            jobrole: "Software Manager",
            jobAddress: "Fulfillment Center Services",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobspec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
        {
            jobrole: "Software Manager",
            jobAddress: "Fulfillment Center Services",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobspec: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        },
    ]
    const [jobdata, setjobdata] = useState(data);


    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/Home')
        }
        if (!authToken) {
            navigate('/Login')
        }
    }, []);


    function logout() {
        setloadscreen(true)
        signOut(auth).then(() => {
            sessionStorage.removeItem('Auth Token');
            setloadscreen(false)
            navigate('/login')
            toast.success("LogOut Successfully :)");
        }).catch((error) => {
            toast.error("Something Wrong. Try After Sometime")
        });
    }

    function gotoAdd() {
        navigate('/Add')
    }


    return (
        <div>
            {
                loadscreen ? <Loading /> : null
            }


            <div class="container px-4 mx-auto md:flex md:items-center bg-slate-100 p-5 mb-5">

                <div class="flex justify-between items-center">
                    <a href="#" class="font-bold text-4xl text-indigo-600">Remote Hire</a>
                </div>

                <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >
                        <button
                            onClick={gotoAdd}
                            class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Find Jobs
                        </button>
                    </div>
                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >
                        <button
                            onClick={gotoAdd}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Appiled Jobs
                        </button>
                    </div>

                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >

                        <button
                            onClick={logout}
                            class="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div class="flex mb-2 w-2/4">
                    <div class="mb-6 mx-2 w-full">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none focus:shadow-blue-500 block w-full p-2.5 "
                            placeholder="jobtitle or company" />
                    </div>
                    <div class="mb-6 mx-2 w-full">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Where</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:shadow-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="city" />
                    </div>
                </div>
                <div className="flex justify-center items-center mx-2">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Find
                    </button>
                </div>
            </div>
            <div className="flex  justify-center">
                <div className="flex-col">
                    <p className="text-2xl font-bold">Job feed</p>
                    <hr className="text-blue-900 bg-blue-900 h-[5px] border mt-3 border-blue-900"></hr>
                </div>
            </div>
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
                                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Apply
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
    )
}

export default Home;