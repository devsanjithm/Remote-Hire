import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { auth, signOut, db } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";
import axios from 'axios';

function Home() {

    const { user, setloadscreen, loadscreen, userroll, setuserroll } = useContext(UserContext);
    const navigate = useNavigate();

    const data = [];
    const [Search, setSearch] = useState(data);
    const [jobdata, setjobdata] = useState(data);
    const uid = localStorage.getItem('uid')
    const [userdata, setuserdata] = useState([]);
    const [AppiledData, setAppiledData] = useState([]);
    const [popup, setpopup] = useState(false);


    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken === "65fefd65c4d84d6sa1xad6wf8e6fe") {
            navigate("/admin")
        } else {
            const role = localStorage.getItem("role");
            if (role === "Hr") {
                navigate("/hrhome")
            } else {
                navigate("/home")
            }
        }
        if (!authToken) {
            navigate('/Login')
        }
        getdata();
        getuserdata();
    }, []);

    async function getdata() {
        const docRef = collection(db, "Jobs");
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
            data.push(doc.data())
        })
        setjobdata([...data]);
        setSearch([...data])
    }

    async function getuserdata() {
        const docref = doc(db, "Users", uid);
        try {
            const docsnap = await getDoc(docref);
            setuserdata(docsnap.data());
            setAppiledData([...docsnap.data().appiledJob]);
        } catch (error) {
            toast.error("Something Wrong");
            console.log(error);
        }
    }

    function logout() {
        setloadscreen(true)
        signOut(auth).then(() => {
            sessionStorage.removeItem('Auth Token');
            localStorage.removeItem('role');
            localStorage.removeItem('uid')
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

    async function handleClick(e) {
        const data = []
        console.log(e);
        if (userdata.appiledJob === undefined) {
            data.push(e.timeid)
        } else {
            userdata.appiledJob.forEach(d => {
                data.push(d);
            })
        }
        if (!(data.includes(e.timeid))) {
            data.push(e.timeid)
        } else {
            return
        }
        console.log(uid);
        try {
            await setDoc(doc(db, "Users", uid), {
                appiledJob: data
            }, { merge: true })
            setuserdata({
                ...userdata,
                appiledJob: data
            })
            setAppiledData([...data])
            toast.success("JOB Appiled. We Let You Known When HR Approves or Reject")
            const message = "This is from the remote hire. A " + userdata.name + " has been Appiled to your Jobs " + e.jobrole + ". Check in portal for further information";
            axios({
                method: 'post',
                url: 'https://remote-hire.herokuapp.com/send',
                data: {
                    email: "sanjithm695@gmail.com",
                    messageHtml: message,
                    subject: "A job Application Notification "
                }
            })
                // fetch("http://localhost:3001/send", requestOptions)
                .then((response) => {
                    if (response.data.msg === 'success') {
                        toast.success("Email sent, awesome!");
                        this.resetForm()
                    } else if (response.data.msg === 'fail') {
                        alert("Oops, something went wrong. Try again")
                    }
                })
        } catch (error) {
            toast.error("something Went wrong");
            console.log(error);
        }
        try {
            const timestamp = new Date().getTime();
            await setDoc(doc(db, "AppiledJobs", timestamp), {
                ...userdata,
                ...e,
                timestamp: timestamp,
                status: "pending"
            })
        } catch (e) {
            toast.error("something wrong");
            console.log(e);
        }
    }

    return (
        <div>
            {
                loadscreen ? <Loading /> : null
            }


            <div
                class="container px-4 mx-auto md:flex md:items-center bg-slate-100 p-5 mb-5">

                <div class="flex justify-between items-center">
                    <a href="#" class="font-bold text-4xl text-indigo-600">Remote Hire</a>
                </div>

                <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                    <div>
                        <div
                            onClick={() => setpopup(!popup)}
                            className="bg-blue-400 px-5 py-3 rounded-full cursor-pointer">
                            <p
                                className="text-center">{userdata.name}</p>
                        </div>
                    </div>
                    {
                        popup ?
                            <div className="absolute top-20 right-5 bg-white p-5 shadow-md rounded">
                                <div className="">
                                    <p
                                        onClick={gotoAdd}
                                        className="py-1 pb-2 cursor-pointer">Appiled Jobs</p>
                                    <p
                                        onClick={logout}
                                        className=" text-red-500 text-lg cursor-pointer">Logout</p>
                                </div>
                            </div>
                            : null
                    }



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

                        function timestamp(e) {
                            var u = new Date(e);
                            return u.toLocaleString()
                        }

                        return (
                            <div key={index} className="p-2">
                                <div class="max-w-md rounded min-h-[50vh] max-h-[45vh] overflow-hidden shadow-lg border-[2px] border-blue-900">
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
                                    <div className="px-6 pt-1">
                                        <p className="text-lg font-bold">Time : {timestamp(element.timestamp)}</p>
                                        <p className="text-lg font-bold">Uploaded By : {element.createrName}</p>
                                    </div>
                                    <div className="px-6 pt-1 flex justify-center pb-5">
                                        <div className="">
                                            <button
                                                onClick={() => handleClick(element)}
                                                disabled={AppiledData.includes(element.id)}
                                                class={AppiledData.includes(element.id) ? "bg-blue-100 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                                                {AppiledData.includes(element.id) ? "Appiled" : "Apply"}
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