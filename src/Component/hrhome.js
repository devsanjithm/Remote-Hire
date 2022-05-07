import React, { useState,useEffect,useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context";
import { toast } from "react-toastify";
import { auth, signOut,db } from "../firebase";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";

function HrHome() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const { user, setloadscreen, loadscreen, userroll, setuserroll } = useContext(UserContext);
    const data = [];
    const uid = localStorage.getItem('uid')
    const [userdata, setuserdata] = useState("");
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
        getdata();
    }, []);

        async function getdata() {
            const docRef = collection(db, "Jobs");
            const docSnap = await getDocs(docRef);
            docSnap.forEach((doc) => {
                if(uid === doc.data().createrid){
                    data.push(doc.data())
                }
            })
            setjobdata([...data]);
        }
    
    function Logout() {
        signOut(auth).then(() => {
            sessionStorage.removeItem('Auth Token');
            localStorage.removeItem('role');
            localStorage.removeItem('uid')
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
            <div className="flex  justify-center">
                <div className="flex-col">
                    <p className="text-2xl font-bold">Your Jobs</p>
                    <hr className="text-blue-900 bg-blue-900 h-[5px] border mt-3 border-blue-900"></hr>
                </div>
            </div>
            <div className=" m-5 p-2 grid grid-cols-3 ">
                {
                    jobdata.map((element, index) => {
                        return (
                            <div key={index} className="p-2">
                                <div class="max-w-md rounded min-h-[30vh] max-h-[30vh] overflow-hidden shadow-lg border-[2px] border-blue-900">
                                    <div class="px-6 pt-4">
                                        <div class="font-bold text-2xl">{element.jobrole}</div>
                                    </div>
                                    <div className="px-6 pt-1">
                                        <p className="text-sm">{element.jobAddress}</p>
                                        <p className="text-sm">{element.jobmode}</p>
                                        <p className="text-sm font-bold pt-2">₹{element.jobsalaryfrom} - ₹{element.jobsalaryto} per year</p>
                                    </div>
                                    <div class="px-6 pt-4 pb-2 max-h-[15vh] min-h-[15vh] overflow-hidden">
                                        <p>{element.jobspec}</p>
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
export default HrHome;