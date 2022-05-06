import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Approve() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const data = [

        {
            name: "Sanjith",
            Age: "Age: 38",
            desg: "Software developer",
            Experience: "12 years",
            Domain: "Web development",

        }

    ]
    const [jobdata, setjobdata] = useState(data);


    return (
        <div>

            <div class="container px-4 mx-auto md:flex md:items-center bg-slate-100 p-5 mb-5">

                <div class="flex justify-between items-center">
                    <a href="#" class="font-bold text-4xl text-indigo-600">Remote Hire</a>
                </div>

                <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                    {/* <div
                            className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                        >
                            <button
                                onClick={() => {
                                    navigate("/Approve")
                                }}
                                class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Add / Remove Hr
                            </button>
                        </div> */}
                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >
                        <button
                            onClick={() => {
                                navigate("/Admin")
                            }}

                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Home
                        </button>
                    </div>

                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >

                        <button
                            onClick={() => {
                                navigate("/login")
                            }}
                            class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div class="font-bold text-2xl">List of Hr Available</div>
            <div className="flex justify-center p-5">



                <div className=" m-5 p-2 grid grid-cols-3 ">

                    {
                        jobdata.map((element, index) => {
                            return (
                                <div key={index} className="p-2">
                                    <div class="max-w-md rounded overflow-hidden shadow-lg border-[2px] border-blue-900">
                                        <div class="px-6 pt-4">
                                            <div class="font-bold text-2xl">{element.name}</div>
                                        </div>
                                        <div className="px-6 pt-1">
                                            <p className="text-sm">{element.Age}</p>
                                            <p className="text-sm">{element.desg}</p>
                                            <p className="text-sm font-bold pt-2">{element.Experience}</p>
                                        </div>
                                        <div class="px-6 pt-4 pb-2">
                                            <p>{element.Domain}</p>
                                        </div>
                                        <div className="px-6 pt-1 flex justify-center pb-4">
                                            <div>
                                                <button
                                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Update
                                                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
export default Approve;