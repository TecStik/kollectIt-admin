import React, { useState, useEffect, useContext } from 'react';
import { Url } from '../../../Pages/Core'
import axios from 'axios';
import AdminList from './AdminList';

export default function Admin() {
    const [allData, setallData] = useState([])
   
    useEffect(() => {
        axios({
            method: "get",
            url: Url + "/auth/AdminEmploye",
        }).then((response) => {
            console.log(response.data, "response")
            setallData(response.data)
        })
    }, []);

    return (
        <>
            <div className="card card-cascade narrower">
                <div className="container mt-3">
                    <h2>Admin</h2>

                    <table className="table table-hover">
                        <thead className="bg-light">
                            <tr>
                                <th>Admin Name</th>
                                <th>Login ID</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Stutus</th>
                                <th>Position</th>
                                <th>Quota</th>
                                <th>Action/Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allData.map((v) => <AdminList alldata={v} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
