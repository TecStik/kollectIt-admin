import axios from 'axios';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Url } from '../../../Pages/Core';



export default function AysnRider() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allData, setallData] = useState([])
    const [Client, setClient] = useState([])
    const [ClinetID, setClinetID] = useState(null)
    const [realTime, setRealTime] = useState(true);

    useEffect(() => {
        axios({
            method: "get",
            url: Url + "/ClientData",
        }).then((response) => {
            // console.log(response.data,"response")
            setClient(response.data.Data)
        })
    }, [realTime])

    useEffect(() => {
        axios({
            method: "get",
            url: Url + "/auth/RiderEmploye",
        }).then((response) => {
            // console.log(response.data,"response")
            setallData(response.data)
        })
    }, [])


    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleOk = () => {
    //     setIsModalVisible(false);
    //     console.log("m")
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    function Rider(RiderName) {
        console.log(ClinetID, "eee");
        axios({
            method: 'post',
            url: Url + "/ClientDataUpdate",
            data: {
                id: ClinetID,
                ClientRider: RiderName
            }
        }).then((res) => {
            console.log(res.data.message, "res");
            alert(res.data.message)
            setRealTime(!realTime);
        }).catch((err) => {
            console.log(err, "err");
        })
    }

    // console.log(ClinetID, "allData");


    // Rider()

    return (
        <div class="modal-dialog-scrollable">


            <div class="card card-cascade narrower ">
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
                    <h2>Aysne Rider</h2>

                    <table class="table table-hover">
                        <thead class="bg-light">
                            <tr>
                                <th>Client Id</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Email</th>
                                <th>Amount</th>
                                {/* <th>Stutus</th> */}
                                <th>Allow Rider Name</th>
                                <th>Aysne Rider</th>
                            </tr>
                        </thead>
                        {Client.map((v, i) => {
                            return (

                                <tbody>
                                    <tr>
                                        <td>{v.ClientId}</td>
                                        <td>{v.ClientName}</td>
                                        <td>{v.ClientEmail}</td>
                                        <td>{v.ClientPhoneNumber}</td>
                                        <td>{v.ClientAmount}</td>
                                        <td>
                                            <span class="badge badge-warning rounded-pill d-inline">{v.ClientRider}</span>
                                        </td>
                                        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={() => setClinetID(v._id)}>
                                            Select Rider
                                        </button></td>

                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div>

                <div class="modal" id="myModal">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content" style={{ width: "115%" }}>

                            {/* <!-- Modal Header --> */}
                            <div class="modal-header">
                                <h1 class="modal-title">Rider Name</h1>
                                <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div class="modal-body">
                                <table id="myTable">
                                    <tr class="header">
                                        {/* <th style={{ width: 60 }}>RiderId</th> */}
                                        <th style={{ width: 60 }}>Name</th>
                                        <th style={{ width: 60 }}>Number</th>
                                        <th style={{ width: 60 }}>AysnRider</th>
                                    </tr>
                                    {allData.map((v, index) => {
                                        return (
                                            <tr>
                                                <td>{v.employeeName}</td>
                                                <td>{v.employeeEmail}</td>
                                                {/* <td>{v.employeePassword}</td> */}
                                                <td><button class="btn btn-warning" onClick={() => Rider(v.employeeName)} data-dismiss="modal">Allow</button></td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
