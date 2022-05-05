import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
function Add() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/Login')
        }
    }, []);


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


        </>
    );
}
export default Add;