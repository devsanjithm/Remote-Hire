import React, { useState } from "react";

function Hrpage() {

    const [BtnToggle, setbtntoggle] = useState(true);


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

                            class="bg-indigo-700 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Find Jobs
                        </button>
                    </div>
                    <div
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

                            class="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center p-5">
                <div>
                    <p
                        className={!BtnToggle ? "text-2xl font-bold text-blue-800" : "text-2xl font-bold text-red-700 scale-110"}
                        onClick={() => {
                            setbtntoggle(true)
                        }}>
                        List Employee
                    </p>
                </div>
                <div className="text-blue-900 bg-blue-900 border border-blue-900 mx-5 h-8">
                </div>
                <div>
                    <p
                        className={BtnToggle ? "text-2xl font-bold text-blue-800" : "text-2xl font-bold text-red-700 scale-110"}
                        onClick={() => {
                            setbtntoggle(false)
                        }}
                    >
                        Add Employee
                    </p>
                </div>
            </div>

            {
                BtnToggle ?
                    <div>
                        list Employee
                    </div> :
                    <div>
                        Add Employee
                    </div>
            }
        </div>
    )
}
export default Hrpage;