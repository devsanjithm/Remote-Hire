import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { auth, signOut,db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";
import { doc, getDocs,collection, setDoc,getDoc } from "firebase/firestore";


function Home() {

    const { user, setloadscreen, loadscreen, userroll, setuserroll } = useContext(UserContext);
    const navigate = useNavigate();
    
    const data =[];
    const [Search, setSearch] = useState(data);
    const [jobdata, setjobdata] = useState(data);
    const uid =  localStorage.getItem('uid')

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
    },[]);
    
    async function getdata(){
        const docRef = collection(db,"Jobs");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc)=>{
            data.push(doc.data())
        })
        setjobdata([...data]);
        setSearch([...data])
    }

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

    function handleSearch(e) {
        const value = e.target.value;
        if (value === "") {
            setjobdata(Search);
            return;
        }
        
        const resuldata = Search.filter(item => {
            const itemdata = item.jobrole.toLowerCase();
            const resdata = itemdata.indexOf(value) > -1;
            return resdata;
        })
        setjobdata([...resuldata])
    }

    async function handleClick(e){
        const data =[]
        console.log(e);
        const docref = doc(db,"Users",uid);
        const docsnap = await getDoc(docref);
        await setDoc(doc(db,"Users",uid),{
            appiledJob:[e.id]
        },{merge:true})

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
                            onClick={() => {
                                navigate("/home")
                            }}
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
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">What Job are you looking for?</label>
                        <input
                            onChange={handleSearch}
                            type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  focus:outline-none focus:shadow-blue-500 block w-full p-2.5 "
                            placeholder="jobtitle or company" />
                    </div>
                    {/* <div class="mb-6 mx-2 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Where</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:shadow-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="city" />
                    </div> */}
                </div>
                {/* <div className="flex justify-center items-center mx-2">
                    <button
                        onClick={handleSearch}
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Find
                    </button>
                </div> */}
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
                                        <p className="text-sm font-bold pt-2">₹{element.jobsalaryfrom} - ₹{element.jobsalaryto} per year</p>
                                    </div>
                                    <div class="px-6 pt-4 pb-2">
                                        <p>{element.jobspec}</p>
                                    </div>
                                    <div className="px-6 pt-1 flex justify-center pb-4">
                                        <div>
                                            <button
                                                onClick={()=>handleClick(element)}
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