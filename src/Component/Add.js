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
        <><nav class="navbar navbar-light bg-primary">
            <div class="container-fluid">
                <h2>Remote Hire</h2>
                <div class="d-flex">
                    <button
                        onClick={() => {
                            navigate("/Home");
                        }}
                        class="btn btn-success">Home</button>&nbsp;
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Add/Update</button>&nbsp;
                    <button class="btn btn-danger">Upload Resume</button>&nbsp;

                </div>
            </div>
        </nav>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add/Update Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label class="form-label">Name</label>
                                    <input type="text" formControlName="name" class="form-control" placeholder="Enter Name" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Image</label>
                                    <input type="url" formControlName="image" class="form-control" placeholder="Enter Url here" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Experience</label>
                                    <input type="text" formControlName="experience" class="form-control" placeholder="Enter Experience" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Date</label>
                                    <input type="text" formControlName="date" class="form-control" placeholder="Enter the last Date" id="exampleInputPassword1" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Salary</label>
                                    <input type="number" formControlName="salary" class="form-control" placeholder="Enter the Salary" id="exampleInputPassword1" />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div></>
    );
}
export default Add;