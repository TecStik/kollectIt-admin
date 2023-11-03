import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Url } from "../../../Pages/Core";
import StoreContext from "../../../ContextApi";
import Filter from "../../filter/filter";
import PaginationComponent from "../../Pagination";

const itemsPerPage = 2;  //pagination limit here


export default function ViewMember() {
    const [allData, setallData] = useState([]);
    const UserCredentials = useContext(StoreContext);
    const [filterItem, setfilterItem] = useState(allData);
    // console.log(UserCredentials.UserData);
    // new state json pagination
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    const [OnData, setOnData] = useState("");


    let employeeName = useRef();
    let Role = useRef();
    let employeeEmail = useRef();
    let loginId = useRef();
    let employeePassword = useRef();



    useEffect(() => {
        axios({
            method: "post",
            url: Url + "/filteredEmployee",
            data: {
                filter: {
                    createdBy: UserCredentials.UserData._id,
                    Role: "Cashier",
                },
            },
        }).then((response) => {
            console.log(response.data, "response");
            setallData(response.data);
        });
    }, []);

    // pagination functions here
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedData = allData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const creatID = (e) => {
        console.log(e, "EEE")
        setOnData(e)
    }

    function handler() {
        console.log(employeeName.current.value)
    }


    return (
        <div class="card card-cascade narrower">
            <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
                <h2>View Members</h2>
                <div className="d-flex flex-row-reverse m-2">
                    <div className="m-2">
                    </div>
                    <div className="m-2">
                        <Filter data={{ allData, setfilterItem }} />
                    </div>
                </div>
                <table class="table table-hover">
                    <thead class="bg-light">
                        <tr>
                            <th>Employee Name</th>
                            <th>Role</th>
                            <th>Employee Email</th>
                            <th>Contact Number</th>
                            <th>Login Id</th>
                            <th>Password</th>
                            <th>Action/Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData?.map((v, i) => {
                            return (
                                <tr key={v?._id}>
                                    <td>{v?.employeeName}</td>
                                    <td>{v?.Role}</td>
                                    <td>{v?.employeeEmail}</td>
                                    <td>No Number</td>
                                    <td>{v?.loginId}</td>
                                    <td>
                                        {v?.employeePassword}
                                    </td>
                                    <td>
                                        <button className="badge badge-primary rounded-pill d-inline"
                                            data-toggle="modal"
                                            data-target="#myModal"
                                            onClick={() => creatID(v)}
                                        >View</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* modal start here */}

                <div class="modal" id="myModal">
                    <div class="modal-dialog modal-dialog-scrollable">
                        <div class="modal-content" style={{ width: "115%" }}>
                            {/* <!-- Modal Header --> */}
                            <div class="modal-header">
                                <h1 class="modal-title">View & Update</h1>
                                <button
                                    type="button"
                                    class="btn btn-danger close"
                                    data-dismiss="modal"
                                >
                                    X
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div class="modal-body">
                                <table id="myTable">
                                    <td className="client__update_container_th">
                                        <th style={{ width: '100%' }}>
                                            <input ref={employeeName} placeholder={`Employee Name ${OnData?.employeeName}`} />
                                        </th>
                                        <th style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                ref={Role}
                                                placeholder={`Role ${OnData?.Role}`}
                                            />
                                        </th>
                                        <th style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                ref={employeeEmail}
                                                placeholder={`Email ${OnData?.employeeEmail}`}
                                            />
                                        </th>
                                        <th style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                ref={loginId}
                                                placeholder={`Login Id ${OnData?.loginId}`}
                                            />
                                        </th>
                                        <th style={{ width: "100%" }}>
                                            <input
                                                type="text"
                                                ref={employeePassword}
                                                placeholder={`Password ${OnData?.employeePassword}`}
                                            />
                                        </th>
                                    </td>
                                </table>
                            </div>

                            {/* <!-- Modal footer --> */}
                            <div class="modal-footer">
                                {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
                                <button
                                    id="sumbit"
                                    aria-label=""
                                    class="btn btn-success close"
                                    data-dismiss="modal"
                                    onClick={() => handler()}
                                >
                                    SUBMIT
                                </button>
                                {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
                                <button type="button" class="btn btn-danger" data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal end here */}

                {/* pagination start here */}
                <PaginationComponent onChange={handlePageChange} page={page} totalPages={totalPages} />
            </div>
        </div>
    );
}
