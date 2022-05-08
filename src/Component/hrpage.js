import React, { useState, useEffect } from "react";
import { auth, signOut } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDocs, collection, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from 'axios';
function Hrpage() {

    const [BtnToggle, setbtntoggle] = useState(true);
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid')
    const [jobdata, setjobdata] = useState([]);

    useEffect(() => {
        getdata();
    }, [])

    async function getdata() {
        try {
            const datas = []
            const data = await getDocs(collection(db, "AppiledJobs"));
            console.log(data.docs);
            const filtredData = data.docs.filter(d => {
                return d.data().createrid === uid && d.data().status === "pending"
            })
            filtredData.forEach(e => {
                datas.push(e.data())
            })
            setjobdata([...datas])
            console.log(filtredData);
        } catch (error) {
            toast.error("Something wrong");
            console.log(error);
        }
    }

    function Logout() {
        signOut(auth).then(() => {
            sessionStorage.removeItem('Auth Token');
            navigate('/login')
            toast.success("LogOut Successfully :)");
        }).catch((error) => {
            toast.error("Something Wrong. Try After Sometime")
        });
    }

    const Inputdata = {
        jobrole: "",
        jobAddress: "",
        jobmode: "",
        jobspec: "",
        jobsalaryfrom: "",
        jobsalaryto: "",
        createrid: uid,
    }
    const [JobInputdata, setJobInputdata] = useState(Inputdata);

    function handleInputChange(e) {
        const { name, value } = e.target;
        setJobInputdata({
            ...JobInputdata,
            [name]: value,
        });
    }

    async function handlesubmit(e) {
        e.preventDefault();
        var utimeid = (Date.now() + Math.random()).toString(36)
        try {
            await setDoc(doc(db, "Jobs", utimeid), {
                ...JobInputdata,
                timeid: utimeid
            });
            console.log(JobInputdata);
            toast.success("Data added")
        } catch (e) {
            toast.error("Something wrong");

        }

    }

    async function handleapprove(e) {
        console.log(e);
        const message = "This is from Remote hire. You been Selected for the " + e.jobrole + " job which you appiled in remote hire platform."
        try {
            await setDoc(doc(db, "AppiledJobs", e.timestamp), {
                status: "Approved"
            }, { merge: true })
            const timestamp = new Date().getTime().toString();
            await setDoc(doc(db, "HR", uid, "ApprovedJobs", e.id), {
                jobid: e.id,
                timestamp: timestamp
            })
            const filtredData = jobdata.filter(d => {
                return d.id !== e.id
            })
            setjobdata([...filtredData])
            toast.success("Approved")
            axios({
                method: 'post',
                url: 'https://remote-hire.herokuapp.com/send',
                data: {
                    email: "sanjithm695@gmail.com",
                    messageHtml: message,
                    subject: "A Job Approval Notification"
                }
            }).then((response) => {
                if (response.data.msg === 'success') {
                    toast.success("Email sent, awesome!");
                    this.resetForm()
                } else if (response.data.msg === 'fail') {
                    alert("Oops, something went wrong. Try again")
                }
            })
        } catch (e) {
            toast.error("Something Wrong");
            console.log(e);
        }
    }

    async function handlereject(e) {
        const message = "This is from Remote hire. You been Rejected for the " + e.jobrole + " job which you appiled in remote hire platform."
        try {
            await setDoc(doc(db, "RejectedJobs", e.timestamp), {
                status: "Rejected"
            }, { merge: true })
            axios({
                method: 'post',
                url: 'https://remote-hire.herokuapp.com/send',
                data: {
                    email: "sanjithm695@gmail.com",
                    messageHtml: message,
                    subject: "A Job Rejected Notification"
                }
            }).then((response) => {
                if (response.data.msg === 'success') {
                    toast.success("Email sent, awesome!");
                    this.resetForm()
                } else if (response.data.msg === 'fail') {
                    alert("Oops, something went wrong. Try again")
                }
            })
            toast.success("Rejected")
        } catch (e) {
            toast.error("Something Wrong");
            console.log(e);
        }
        const filtredData = jobdata.filter(d => {
            return d.id !== e.id
        })
        setjobdata([...filtredData]);
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
                    </div> */}
                    <div
                        className="px-3 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
                    >
                        <button
                            onClick={() => {
                                navigate("/hrhome")
                            }}
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            List Jobs
                        </button>
                    </div>

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
                        className={!BtnToggle ? "cursor-pointer text-2xl font-bold text-blue-800" : "cursor-pointer text-2xl font-bold text-red-700 scale-110"}
                        onClick={() => {
                            setbtntoggle(true)
                        }}>
                        Appiled Employee
                    </p>
                    {
                        !BtnToggle ? null : <hr className="text-blue-900 bg-blue-900 h-[5px] border mt-3 border-blue-900"></hr>
                    }
                </div>
                <div className="text-blue-900 bg-blue-900 border border-blue-900 mx-5 h-8">
                </div>
                <div>
                    <p
                        className={BtnToggle ? "cursor-pointer text-2xl font-bold text-blue-800" : "cursor-pointer text-2xl font-bold text-red-700 scale-110"}
                        onClick={() => {
                            setbtntoggle(false)
                        }}
                    >
                        Add Jobs
                    </p >
                    {
                        BtnToggle ? null : <hr className="text-blue-900 bg-blue-900 h-[5px] border mt-3 border-blue-900"></hr>
                    }
                </div >
            </div >
            {/* <div className="flex  justify-center">
                <div className="flex-col">
                    <p className="text-2xl font-bold">Appiled Employee</p>
                    <hr className="text-blue-900 bg-blue-900 h-[5px] border mt-3 border-blue-900"></hr>
                </div>
            </div> */}
            <div className="px-20 pt-10">
                {
                    BtnToggle ?
                        <div>
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray-500 ">
                                    <thead class="text-xs text-gray-50 uppercase bg-gray-500 ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Person Appiled
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Appiled Job
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Approve
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Reject
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            jobdata.map((element, index) => {
                                                return (
                                                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                            {element.name}
                                                        </th>
                                                        <td class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                            {element.jobrole}
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <button
                                                                onClick={() => handleapprove(element)}
                                                                class="bg-blue-600 py-1 hover:bg-blue-700 text-white font-bold px-4 rounded-full">
                                                                Approve
                                                            </button>
                                                        </td>
                                                        <td class="px-6 py-4">
                                                            <button
                                                                onClick={() => handlereject(element)}
                                                                class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
                                                                Reject
                                                            </button>
                                                        </td>

                                                    </tr>

                                                    // <div key={index} className="p-2">
                                                    //     <div class="max-w-md rounded overflow-hidden shadow-lg border-[2px] border-blue-900">
                                                    //         <div class="px-6 pt-4">
                                                    //             <div class="font-bold text-2xl">{element.username}</div>
                                                    //         </div>
                                                    //         <div class="px-6 pt-4">
                                                    //             <div class="font-bold text-2xl">{element.jobrole}</div>
                                                    //         </div>
                                                    //         <div className="px-6 pt-1">
                                                    //             <p className="text-sm">{element.jobAddress}</p>
                                                    //             <p className="text-sm">{element.jobmode}</p>
                                                    //             <p className="text-sm font-bold pt-2">₹{element.jobsalaryfrom} - ₹{element.jobsalaryto} per year</p>
                                                    //         </div>
                                                    //         <div class="px-6 pt-4 pb-2">
                                                    //             <p>{element.jobstatus}</p>
                                                    //         </div>
                                                    //         <div class="px-6 pt-4 pb-2 max-h-[15vh] min-h-[15vh] overflow-hidden">
                                                    //             <p>{element.jobspec}</p>
                                                    //         </div>
                                                    //         <div className="px-6 pt-1 flex justify-center pb-4">
                                                    //             <div>
                                                    //                 <button
                                                    //                     onClick={handleapprove}
                                                    //                     class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    //                     Approve
                                                    //                 </button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    //             </div>
                                                    //             <div>
                                                    //                 <button
                                                    //                     class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    //                     Reject
                                                    //                 </button>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div>
                                                    // </div>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>


                        </div>

                        :
                        <div className="flex justify-center mt-5 ">
                            <div className="w-[80%] flex justify-center">
                                <form style={{ "width": 70 + "%" }}>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input
                                            onChange={handleInputChange}
                                            value={JobInputdata.jobrole}
                                            type="text" name="jobrole" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" required placeholder=" " />
                                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Role</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text"
                                            onChange={handleInputChange}
                                            value={JobInputdata.jobmode}
                                            name="jobmode" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                        <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Mode</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text"
                                            onChange={handleInputChange}
                                            value={JobInputdata.jobAddress}
                                            name="jobAddress" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Address</label>
                                    </div>

                                    <div class="grid xl:grid-cols-2 xl:gap-6">
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                onChange={handleInputChange}
                                                value={JobInputdata.jobsalaryfrom}
                                                name="jobsalaryfrom" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job salary (From)</label>
                                        </div>
                                        <div class="relative z-0 w-full mb-6 group">
                                            <input type="text"
                                                onChange={handleInputChange}
                                                value={JobInputdata.jobsalaryto}
                                                name="jobsalaryto" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Salary (TO)</label>
                                        </div>
                                    </div>
                                    <div class="relative z-0 w-full mb-6 group">
                                        <input type="text"
                                            onChange={handleInputChange}
                                            value={JobInputdata.jobspec}
                                            name="jobspec" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                                        <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Specification</label>
                                    </div>
                                    <button
                                        onClick={handlesubmit}
                                        type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </form>
                            </div>
                        </div>
                }
            </div>
        </div >
    )
}
export default Hrpage;