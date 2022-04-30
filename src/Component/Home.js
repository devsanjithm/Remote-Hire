import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context";
import { auth, signOut } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";


function Home() {

    const { user, setloadscreen, loadscreen } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            console.log("hi");
            navigate("/Login");
        }
    }, [user])



    return (
        <div>
            {
                loadscreen ? <Loading /> : null
            }
            {
                user ?
                    <p>hi, {user.uid}</p> :
                    <p>hiughi</p>
            }

            <button
                onClick={() => {
                    signOut(auth).then(() => {
                        toast.success("LogOut Successfully :)");
                    }).catch((error) => {
                        toast.error("Something Wrong. Try After Sometime")
                    });
                }}
            >
                LogOUT
            </button>
            <button
                onClick={() => {
                    setloadscreen(!loadscreen);
                    console.log(loadscreen);
                }}
            >click</button>
        </div>
    )
}

export default Home;