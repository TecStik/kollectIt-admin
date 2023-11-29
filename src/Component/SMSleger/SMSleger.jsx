import React, { useState, useEffect, useContext } from 'react';
import { Url } from '../../Pages/Core'
import axios from 'axios';
import SMSlegerList from './SMSlegerList';
import StoreContext from '../../ContextApi';
// import Filter from "../filter/filter";
import SMSFilter from './SMSFilter';
import "./sms.css";
import PaginationComponent from "../Pagination";
import { CircularProgress } from "@mui/material";

const itemsPerPage = 5;


export default function SMSleger() {
    const [allData, setallData] = useState([])
    const UserCredentials = useContext(StoreContext);
    const [filterItem, setfilterItem] = useState(allData);
    // const [refresher, setRefresher] = useState(false);
    const [BelongsID, setBelongsID] = useState(UserCredentials.UserData.Role)
    let ID = UserCredentials.UserData._id
    const [loading, setLoading] = useState(true)

    // new state json pagination
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allData?.length / itemsPerPage);



    useEffect(() => {

        if (BelongsID == 'Admin') {
            axios({
                method: "Post",
                url: Url + '/smsLedger',
                data: {
                    "filter": {
                        "BelongsTo": UserCredentials.UserData._id
                    }
                }
            }).then((response) => {
                setLoading(false);
                console.log(response?.data);
                setallData(response.data)
            })
        } else {
            axios({
                method: "Post",
                url: Url + '/smsLedger',
                data: {
                    "filter": {
                        "createdBy": UserCredentials.UserData.createdBy
                        // "createdBy": "646f09d7d9957a50a32abb4c"
                    }
                }
            }).then((response) => {
                setLoading(false);
                console.log(response.data);
                setallData(response.data)
            })


        }
    }, [])

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedData = allData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // filter functionality here
    
     console.log(allData);

    return (
        <>
            <div className="card card-cascade narrower">
                <div className="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
                    <h2>SMS Ledger</h2>
                    <div className="d-flex flex-row-reverse m-2">
                        <div className="m-2">
                        </div>
                        <div className="m-2">
                            <SMSFilter data={{ allData, setfilterItem }} />
                        </div>
                    </div>
                    {
                        loading ? <div style={{display:"flex",justifyContent:"center",alignItems:'center'}}>
                            <CircularProgress />
                        </div> : <>
                            <table className="table table-hover">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Date</th>
                                        <th>Mode</th>
                                        <th>Qty</th>
                                        <th>Sender</th>
                                        <th>Client</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedData.map((v) => <SMSlegerList alldata={v} />)}
                                </tbody>
                            </table>
                            <div style={{ padding: "10px 0px" }}>
                                <PaginationComponent page={page} onChange={handlePageChange} allData={allData} totalPages={totalPages} />
                            </div>
                        </>
                    }

                </div>

            </div>
        </>
    )
}
