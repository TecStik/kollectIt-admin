import { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import StoreContext from "../../ContextApi";
import { Url } from "../../Pages/Core";
import Filter from "../filter/filter";
import { CSVLink } from "react-csv";
import axios from "axios";
import React from "react";
import "./Transaction.css";
import moment from "moment";
// new import pagination here
import PaginationComponent from "../Pagination";
import TransactionFilter from "./TransactionFilter";
import { CircularProgress } from "@mui/material";




const itemsPerPage = 5;  //pagination limit here


export default function TransactionList() {
  const [allData, setallData] = useState([]);
  const [fromName, setFromName] = useState([]);
  const [toName, setToName] = useState([]);
  const [filterItem, setfilterItem] = useState(allData);
  const [loading, setLoading] = useState(true);

  // new state json pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);



  const UserCredentials = useContext(StoreContext);
  const csvLinkEl = useRef(null);

  const headers = [
    { label: "Date", key: "createdOn" },
    { label: "Nature", key: "Nature" },
    { label: "From", key: "From" },
    { label: "to", key: "to" },
    { label: "Amount", key: "PaymentAmount" },
    { label: "Stutus", key: "Active" },
  ];

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/auth/filterTransaction",
      data: {
        filter: {
          BelongsTo: UserCredentials.UserData._id,
        },
      },
    })
      .then((res) => {
        setLoading(false);
        // console.log(res.data, "resss");
        setallData(res.data);
        transaction(res.data);
      })
      .catch((err) => { });
  }, []);


  // pagination functions here
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = allData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  function transaction(data) {
    for (let i = 0; i < data.length; i++) {
      const traData = data[i];

      //   console.log(traData.to, "to");
      //   console.log(traData.From, "from");

      // for to
      axios({
        method: "post",
        url: Url + "/auth/empolyeeClientData",
        data: {
          EmployeeObjectId: traData.to,
        },
      })
        .then((res) => {
          // console.log(res.data, "in Internal Transfer to API");
          setToName(res.data.Employee[0].employeeName);
          // setDate()
        })
        .catch((error) => {
          console.error("Error in Internal transfer to ", error);
        });

      //for from
      axios({
        method: "post",
        url: Url + "/auth/empolyeeClientData",
        data: {
          EmployeeObjectId: traData.From,
        },
      })
        .then((res) => {
          //   console.log(res.data, "in Internal Transfer from API");
          setFromName(res.data.Employee[0].employeeName);
        })
        .catch((error) => {
          console.error("Error in Internal transfer from ", error);
        });

      // //for from
      // axios({

      //     method: "post",
      //     url: Url + "/filteredClients",
      //     data: {
      //         "filter": {
      //             _id: traData.From
      //         }
      //     }

      // }).then((res) => {

      //     // console.log(res.data[0].CashierName, "in Internal Transfer from API");
      //     setFromName(res.data[0].CashierName);

      // }).catch((error) => {
      //     console.error("Error in Internal transfer from ", error);

      // });
    }
  }

  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };


  const createFilter = (filterParams) => {
    console.log("FilterParams in createFilter", filterParams);
    const { nature, from, to, enddate, createdOn } = filterParams;
    let filtered = allData;
    filtered = (nature) ? filtered.filter((item) => item.Nature === nature) : filtered;
    filtered = (from) ? filtered.filter((item) => item?.fromName === from) : filtered
    filtered = (to) ? filtered.filter((item) => item?.toName === to) : filtered;

    //payment start date
    filtered = (createdOn) ? filtered.filter((item) => new Date(item?.createdOn) >= new Date(createdOn)) : filtered;
    //payment  end date
    filtered = (enddate) ? filtered.filter((item) => new Date(item?.createdOn) <= new Date(enddate)) : filtered;




    console.log("Filtered item in create filter", filtered);
    setfilterItem(filtered);

    return filtered
  };

  return (
    <div className="card card-cascade narrower">
      <div className="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
        <h2>Transaction List</h2>

        <CSVLink
          headers={headers}
          filename="Transaction List.csv"
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
            <TransactionFilter data={{ allData, createFilter }} />
          </div>
        </div>
        {
          loading ? <div style={{display:"flex",justifyContent:"center",alignItems:'center'}}>
            <CircularProgress/>
          </div> : <>

            <table className="table table-hover">
              <thead className="bg-light">
                <tr>
                  <th>Date</th>
                  <th>Nature</th>
                  <th>From</th>
                  <th>to</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayedData?.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>{moment(v?.createdOn).format("llll")}</td>
                      <td>{v?.Nature}</td>
                      <td>{fromName}</td>
                      <td>{toName}</td>
                      <td>{v?.PaymentAmount}</td>
                      <td>
                        <span className="badge badge-primary rounded-pill d-inline">
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {/* <tr>
                            <td>Mary</td>
                            <td>mary@example.com</td>
                            <td>Moe</td>
                            <td>Junior</td>
                            <td>Junior</td>
                            <td>
                                <span class="badge badge-primary rounded-pill d-inline"
                                >Onboarding</span
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>July</td>
                            <td>july@example.com</td>
                            <td>Dooley</td>
                            <td>Senior</td>
                            <td>Senior</td>
                            <td>
                                <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
                            </td>
                        </tr> */}
              </tbody>
            </table>
            <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
          </>
        }
      </div>
    </div>
  );
}
