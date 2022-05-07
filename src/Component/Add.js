import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import { auth, signOut, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";

function Add() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const data = []
    const [jobdata, setjobdata] = useState(data);
    const uid = localStorage.getItem('uid')


    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken === "65fefd65c4d84d6sa1xad6wf8e6fe") {
            navigate("/admin")
        } else {
            const role = localStorage.getItem("role");
            if (role === "Hr") {
                navigate("/hrhome")
            } else {
                navigate("/add")
            }
        }
        if (!authToken) {
            navigate('/Login')
        }
        getdata()
    }, []);

    async function getdata() {
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);
        const jobappileddata = docSnap.data().appiledJob
        const docRef1 = collection(db, "Jobs");
        const docSnap1 = await getDocs(docRef1);
        docSnap1.forEach((doc) => {
            if (jobappileddata.includes(doc.data().id)) {
                data.push(doc.data())
            }
        })
        setjobdata([...data]);
        console.log(data);
        console.log(jobappileddata);
    }


    return (
        <><div class="container px-4 mx-auto md:flex md:items-center bg-slate-100 p-5 mb-5">

            <div class="flex justify-between items-center">
                <a href="#" class="font-bold text-4xl text-indigo-600">Remote Hire</a>
                <button class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                <div
                    className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                >
                    <button
                        onClick={() => {
                            navigate("/home")
                        }}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Find Jobs
                    </button>
                </div>
            </div>
        </div>
        <div className="flex  justify-center">
                <div className="flex-col">
                    <p className="text-2xl font-bold">Appiled Jobs</p>
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
                                        <p className="text-sm font-bold pt-2">₹{element.jobsalaryfrom} - ₹{element.jobsalaryto} per year</p>
                                    </div>
                                    <div class="px-6 pt-4 pb-2">
                                        <p>{element.jobspec}</p>
                                    </div>
                                    <div className="px-6 pt-1 flex justify-center pb-4">
                                        <div>
                                            <button
                                                // onClick={()=>handleClick(element)}
                                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Applied
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </div>


        </>
    );
}
export default Add;