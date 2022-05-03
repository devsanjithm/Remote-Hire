import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { auth, signOut } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";


function Home() {

    const { user, setloadscreen, loadscreen } = useContext(UserContext);
    const navigate = useNavigate();


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
            <nav class="navbar navbar-light bg-primary">
                <div class="container-fluid">
                    <h2>Remote Hire</h2>
                    <div class="d-flex">

                        <button
                            onClick={gotoAdd}
                            class="btn btn-success">Applied Jobs</button>&nbsp;
                        <button class="btn btn-success">Result</button>&nbsp;
                        <button
                            onClick={logout}
                            class="btn btn-danger">logout</button>
                    </div>
                </div>
            </nav><table class="table mt-10">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>F34E-RSTI-OPQS</td>
                        <td>Admin</td>
                        <td>10-02-2021</td>
                    </tr>
                </tbody>
            </table><div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="cards shadow-lg">
                            <div class="text-center">
                                <h1>Admin</h1>
                                <p>Mr.XYZ</p>
                                <p>3-5 years</p>
                                <p>3 LPA</p>
                                <p>10-02-2021</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nostrum.</p>
                                <button class="btn btn-danger">Approve</button>&nbsp;
                                <button class="btn btn-danger">Reject</button>&nbsp;
                                <button class="btn btn-danger">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;