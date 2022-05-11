import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, signOut, db } from "../firebase";
import { toast } from "react-toastify";
import { doc, getDocs, collection, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";

function Approve() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const data = []
    const [jobdata, setjobdata] = useState(data);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        getdata();
    }, []);

    async function getdata() {
        const docRef = collection(db, "HR");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
            data.push(doc.data())
        })
        setjobdata([...data]);
        console.log(data);
    }

    async function handleremove(e) {
        console.log(e);
        try {
            deleteUser(user).then(() => {
                console.log("user deleted")
            }).catch((error) => {
                toast.error("Something Wrong")
            });
            await deleteDoc(doc(db, "HR", e.id));
            const data = jobdata.filter(d => {
                return d.id !== e.id
            })
            setjobdata([...data]);
            toast.success("Hr Removed Successfully")
        } catch (error) {
            console.log(error);
            toast.error("Something Wrong");
        }
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
            <div className="flex  justify-center">
                <div className="flex-col">
                    <p className="text-2xl font-bold">List of HR Available</p>
                    <hr className="text-blue-900 bg-blue-900 h-[5px] border mt-3 border-blue-900"></hr>
                </div>
            </div>
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
                                            <p className="text-sm">Role : {element.role}</p>
                                            <p className="text-sm">Mobile Number : {element.mobilenumber}</p>
                                        </div>
                                        <div class="px-6 pt-4 pb-2">
                                            <p>{element.Domain}</p>
                                        </div>
                                        <div className="px-6 pt-1 flex justify-center pb-4">
                                            <div>
                                                <button
                                                    onClick={() => handleremove(element)}
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