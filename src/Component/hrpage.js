import React, { useState } from "react";
import { auth, signOut } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Hrpage() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const data = [

        {
            username: "Sanjith",
            jobrole: "Software Manager",
            Experience: "2-3 Years",
            jobmode: "Remote",
            jobsalary:
            {
                from: "200,000.00",
                to: "1,200,129.00"
            },
            jobstatus: "Not approved"
        }


    ]
    const [jobdata, setjobdata] = useState(data);

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
                            onClick={Logout}
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
                        Add Jobs
                    </p>
                </div>
            </div>
            <div className="">
                {
                    BtnToggle ?
                        <div>
                            <div className=" m-5 p-2 grid grid-cols-3 ">

                                {
                                    jobdata.map((element, index) => {
                                        return (
                                            <div key={index} className="p-2">
                                                <div class="max-w-md rounded overflow-hidden shadow-lg border-[2px] border-blue-900">
                                                    <div class="px-6 pt-4">
                                                        <div class="font-bold text-2xl">{element.username}</div>
                                                    </div>
                                                    <div class="px-6 pt-4">
                                                        <div class="font-bold text-2xl">{element.jobrole}</div>
                                                    </div>
                                                    <div className="px-6 pt-1">
                                                        <p className="text-sm">{element.Experience}</p>
                                                        <p className="text-sm">{element.jobmode}</p>
                                                        <p className="text-sm font-bold pt-2">₹{element.jobsalary.from} - ₹{element.jobsalary.to} per year</p>
                                                    </div>
                                                    <div class="px-6 pt-4 pb-2">
                                                        <p>{element.jobstatus}</p>
                                                    </div>
                                                    <div className="px-6 pt-1 flex justify-center pb-4">
                                                        <div>
                                                            <button
                                                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                                Approve
                                                            </button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </div>
                                                        <div>
                                                            <button
                                                                class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>





                        </div> :
                        <div className="flex justify-center mt-5 ">
                            <div className="w-[80%] flex justify-center">
                                <form style={{ "width": 70 + "%" }}>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text" name="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required placeholder=" " />
                                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Role</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                        <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Mode</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Address</label>
                                    </div>

                                    <div class="grid xl:grid-cols-2 xl:gap-6">
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="jobsalaryfrom" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job salary (From)</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text" name="jobsalaryto" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Salary (TO)</label>
                                        </div>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Specification</label>
                                    </div>
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </form>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default Hrpage;