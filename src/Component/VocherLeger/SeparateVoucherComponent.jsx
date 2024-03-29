import React, { useState, useContext } from 'react';
import { Pagination } from "@mui/material"
import moment from 'moment';
import { CircularProgress } from "@mui/material";

const itemsPerPage = 5;

const SeparateVoucherComponent = ({ allData, loading }) => {
   
    // new state json pagination
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allData.length / itemsPerPage);


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

    return (
        <div>
            {
                loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div> : <>
                    <table className="table table-hover">
                        <thead className="bg-light">
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
