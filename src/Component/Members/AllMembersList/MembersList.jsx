import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import StoreContext from '../../../ContextApi'
import { Url } from '../../../Pages/Core';
import './MembersList'

export default function MembarList() {


    const [allData, setallData] = useState([])
    const RoleDetails = useContext(StoreContext);
    const [realTime, setRealTime] = useState(true);
    const Role = RoleDetails.Role;


    useEffect(() => {
        axios({
            method: "get",
            url: Url + '/auth/employe',
        }).then((response) => {
            // console.log(response.data,"response")
            setallData(response.data)

        })
    }, [realTime])

    function Admin(e) {

        axios({
            method: "post",
            url: Url + '/auth/AdminEmploye',
            data: {
                id: e
            }
        }).then((response) => {
            console.log(response.data, "response")
            alert("Admin created Successfully!")
            setRealTime(!realTime);
        })
    }

    const Cashier = (e) => {

        axios({
            method: "post",
            url: Url + '/auth/CashierEmploye',
            data: {
                id: e
            }
        }).then((response) => {
            console.log(response.data, "response")
            alert("Cashier created Successfully!")
            setRealTime(!realTime);
        })
    }

    const Rider = (e) => {

        axios({
            method: "post",
            url: Url + '/auth/RiderEmploye',
            data: {
                id: e
            }
        }).then((response) => {
            console.log(response.data, "response")
            alert("Rider created Successfully!")
            setRealTime(!realTime);
        })
    }

    return (

        <div class="card card-cascade narrower">
            <div
                class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">

                <div>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-th-large mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-columns mt-0"></i>
                    </button>
                </div>

                <a href="" class="white-text mx-3">Allow Access</a>

                <div>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-pencil-alt mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="far fa-trash-alt mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-info-circle mt-0"></i>
                    </button>
                </div>

            </div>
            <div class="container mt-3">
                <h2>All Data Member List</h2>

                <table class="table table-hover">
                    <thead class="bg-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Stutus</th>
                            <th>Position</th>
                            <th>Action/Roles</th>
                        </tr>
                    </thead>
                    {allData.map((v, i) => {
                        return (

                            <tbody>
                                <tr>
                                    <td>{v.employeeName}</td>
                                    <td>{v.employeeEmail}</td>
                                    <td>{v.employeePassword}</td>
                                    <td>
                                        <span class="badge badge-warning rounded-pill d-inline">{v.Role}</span>
                                    </td>
                                    <td>Senior</td>
                                    <td>
                                        {Role === "SuperAdmin" ? <>
                                            <button type="button" class="btn btn-success btn-rounded" onClick={() => Admin(v._id)}>Admin</button>
                                            <button type="button" class="btn btn-warning btn-rounded" onClick={() => Cashier(v._id)}>Cashier</button>
                                            <button type="button" class="btn btn-primary btn-rounded" onClick={() => Rider(v._id)}>Rider</button>
                                        </> : Role === "Admin" ? <>
                                            <button type="button" class="btn btn-warning btn-rounded" onClick={() => Cashier(v._id)}>Cashier</button>
                                            <button type="button" class="btn btn-primary btn-rounded" onClick={() => Rider(v._id)}>Rider</button>
                                        </> : Role === "Cashier" ? <>
                                            <button type="button" class="btn btn-primary btn-rounded" onClick={() => Rider(v._id)}>Rider</button>
                                        </> : <></>}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
