import React, { useState, useEffect, useContext, useRef } from "react";
import VocherLegerList from "./VocherLegerList";
import StoreContext from "../../ContextApi";
import { Url } from "../../Pages/Core";
// import Filter from "../filter/filter";
import { CSVLink } from "react-csv";
import moment from "moment";
import axios from "axios";
import "./Voucher.css";
import VoucherFilter from "./VoucherFilter";
// pagination import here
import PaginationComponent from "../Pagination";
import { CircularProgress } from "@mui/material";

const itemsPerPage = 5;



export default function VocherLeger() {
  const [prevBalance, setPrevBalance] = useState(0);
  const UserCredentials = useContext(StoreContext);
  const csvLinkEl = useRef(null);
  const [filterItem, setfilterItem] = useState([]);
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(true);

  // new state json pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);



  const headers = [
    { label: "Date", key: "createdOn" },
    { label: "Description", key: "Description" },
    { label: "Mode", key: "Mode" },
    { label: "Amount	", key: "Amount" },
  ];

  useEffect(() => {
    if (UserCredentials?.UserData?.Role == "Admin") {
      axios({
        method: "Post",
        url: Url + "/filteredVoucher",
        data: {
          filter: {
            BelongsTo: UserCredentials?.UserData?._id,
            // BelongsTo: "63db55cf07ec951109a359c7",
          },
        },
      }).then((response) => {
        console.log(response?.data);
        setLoading(false);
        setfilterItem(response?.data);
        // console.log(response.data)
        setallData(response?.data);
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
        console.log(response);
        setLoading(false)
        setfilterItem(response?.data);
        // console.log(response.data,"smsLedger=>Response");
        setallData(response?.data);
      });
    }
  }, []);


  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const displayedData = filterItem.slice(
  //   (page - 1) * itemsPerPage,
  //   page * itemsPerPage
  // );


  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };

  const createFilter = (filterParams) => {
    console.log("FilterParams in createFilter", filterParams);
    const { Mode, createdOn,cashenddate } = filterParams;
    let filtered = allData;
    filtered = (Mode) ? filtered.filter((item) => item.Mode === Mode) : filtered;
    //payment start date
    filtered = (createdOn) ? filtered.filter((item) => new Date(item?.createdOn) >= new Date(createdOn)) : filtered;
    //payment  end date
    filtered = (cashenddate) ? filtered.filter((item) => new Date(item?.createdOn) <= new Date(cashenddate)) : filtered;




    console.log("Filtered item in create filter", filtered);
    setfilterItem(filtered);

    return filtered
  };


  return (
    <>
      <div className="card card-cascade narrower">
        <div
          className="container mt-3 overflow-auto"
          style={{ maxHeight: "110vh" }}
        >
          <h2>Cash Ledger</h2>
          <CSVLink
            headers={headers}
            filename="VocherLeger List.csv"
            data={allData}
            ref={csvLinkEl}
          />
          <div className="d-flex flex-row-reverse m-2">
            <div className="m-2">
              <button
                className="btn text-white "
                style={{
                  background: "#427D8F",
                  fontSize: 15,
                  marginTop: "-3%",
                }}
                onClick={downloadReport}
                role="button"
              >
                Export
                <i className="far fa-circle-down mx-2 "></i>
              </button>
            </div>
            <div className="m-2">
              <VoucherFilter data={{ allData, createFilter }} />
            </div>
          </div>
        </div>

        {
          loading ? <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <CircularProgress />
          </div> : <>   <table className="table table-hover">
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
              {filterItem?.slice((page - 1) * itemsPerPage, page * itemsPerPage)?.map((v) => {
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
            <div style={{ padding: "30px 0px" }}>
              <PaginationComponent page={page} totalPages={totalPages} onChange={handlePageChange} allData={allData} />
            </div></>
        }
      </div>
    </>
  );
}
