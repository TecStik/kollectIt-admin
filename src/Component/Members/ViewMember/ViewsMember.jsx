import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Url } from "../../../Pages/Core";
import StoreContext from "../../../ContextApi";
import Filter from "../../filter/filter";
import PaginationComponent from "../../Pagination";
// loading import material ui here
import PropTypes from 'prop-types';
import { Typography, CircularProgress, Box } from "@mui/material";
import ViewMemberFilter from "./ViewMemberFilter";




// loading function here
function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};









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
    const [progress, setProgress] = useState(10);
    const [loading, setLoading] = useState(true);


    // loading useEffect here
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);


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
            setTimeout(() => {
                setLoading(false)
            }, 2000);
            console.log(response.data, "response");
            setallData(response.data);

        });
    }, []);

    // pagination functions here
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedData = filterItem.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const creatID = (e) => {
        console.log(e, "EEE")
        setOnData(e)
    }

    function handler() {
        console.log(employeeName.current.value)
        // update api calling here
        axios({
            method: "post",
            url: Url + "/UpdateEmpolyee",
            data: {
                filter: {
                    _id: OnData?._id
                },
                Update: {
                    employeeName: employeeName.current.value ? employeeName.current.value : OnData?.employeeName,
                    Role: Role.current.value ? Role.current.value : OnData?.Role,
                    employeeEmail: employeeEmail.current.value ? employeeEmail.current.value : OnData?.employeeEmail,
                    loginId: loginId.current.value ? loginId.current.value : OnData?.loginId,
                    employeePassword: employeePassword.current.value ? employeePassword.current.value : OnData?.employeePassword
                }
            }
        }).then((res) => {
            console.log("Employee Update ====>", res?.data)
        }).catch((err) => console.log(err?.message))

        //  fetch api call here

        setTimeout(() => {
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
                setTimeout(() => {
                    setLoading(false)
                }, 2000);
                console.log(response.data, "response");
                setallData(response.data);

            }).catch(err => console.log(err?.message));
        }, 100);
    }

    const createFilter = (filterParams) => {
        console.log("FilterParams in createFilter", filterParams);
        const { employeeName, employeeEmail, Role} = filterParams;
        let filtered = allData;
       
        filtered = (employeeName) ? filtered.filter((item) => item.employeeName === employeeName) : filtered;
        filtered = (employeeEmail) ? filtered.filter((item) => item?.employeeEmail === employeeEmail) : filtered
        filtered = (Role) ? filtered.filter((item) => item?.Role === Role) : filtered;
       




        console.log("Filtered item in create filter", filtered);
        setfilterItem(filtered);

        return filtered
    }; 


    return (
        <div class="card card-cascade narrower">
            <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
                <h2>View Members</h2>
                <div className="d-flex flex-row-reverse m-2">
                    <div className="m-2">
                    </div>
                    <div className="m-2">
                        <ViewMemberFilter data={{ allData, createFilter }} />
                    </div>
                </div>

                {
                    loading ? <div>
                        <CircularProgressWithLabel value={progress} />
                    </div> : <>
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
                    </>
                }
            </div>
        </div>
    );
}
