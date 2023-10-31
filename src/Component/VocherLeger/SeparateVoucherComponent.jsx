import React, { useState, useEffect, useContext } from 'react';
import { Stack, Pagination, Typography } from "@mui/material"
import axios from "axios";
import { Url } from '../../Pages/Core';
import StoreContext from '../../ContextApi';
import moment from 'moment';
import { CircularProgress } from "@mui/material";

const itemsPerPage = 5;

const SeparateVoucherComponent = () => {
    const UserCredentials = useContext(StoreContext);
    const [allData, setallData] = useState([])
    const [loading, setLoading] = useState(true);

    // new state json pagination
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allData.length / itemsPerPage);

    // calling useEffect here 

    // pagination functions here
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedData = allData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );



    const headers = [
        { label: "Date", key: "createdOn" },
        { label: "Description", key: "Description" },
        { label: "Mode", key: "Mode" },
        { label: "Amount", key: "Amount" },
        // { label: "Balance", key: "PaymentAmount" },
    ];


    useEffect(() => {
        if (UserCredentials?.UserData?.Role == "Admin") {
            axios({
                method: "Post",
                url: Url + "/filteredVoucher",
                data: {
                    filter: {
                        BelongsTo: UserCredentials?.UserData?._id,
                        Mode:"Credit"
                        // BelongsTo: "63db55cf07ec951109a359c7",
                    },
                },
            }).then((response) => {
                // console.log(response.data)
                setallData(response?.data,"Voucher Data. Pagination component");
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });
        } else {
            axios({
                method: "Post",
                url: Url + "/smsLedger",
                data: {
                    filter: {
                        createdBy: UserCredentials?.UserData?.createdBy,
                        // "createdBy": "646f09d7d9957a50a32abb4c"
                    },
                },
            }).then((response) => {
                // console.log(response.data,"smsLedger=>Response");
                setallData(response?.data);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });
        }
    }, [allData]);

    return (
        <div>
            {
                loading ? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <CircularProgress />
                </div> : <>
                    <table class="table table-hover">
                        <thead class="bg-light">
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Mode</th>
                                <th>Amount</th>
                                {/* <th>Balance</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData?.map((v) => {
                                // <VocherLegerList alldata={v} />

                                return (
                                    <tr>
                                        <td>{moment(v?.createdOn).format("llll")}</td>
                                        <td>{v?.Description}</td>
                                        <td>{v?.Mode}</td>
                                        <td>{v?.Amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* pagination start here */}

                    <div style={{ padding: "30px 0px" }}>
                        <Pagination
                            className="pagi__style"
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                </>
            }

        </div>
    )
}

export default SeparateVoucherComponent
