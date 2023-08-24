import React, { useState, useEffect, useContext, useRef } from "react";
import VocherLegerList from "./VocherLegerList";
import StoreContext from "../../ContextApi";
import { Url } from "../../Pages/Core";
import { CSVLink } from "react-csv";
import moment from "moment";
import axios from "axios";

export default function VocherLeger() {
  const [prevBalance, setPrevBalance] = useState(0);
  const [allData, setallData] = useState([]);
  const UserCredentials = useContext(StoreContext);
  const csvLinkEl = useRef(null);

  const headers = [
    { label: "Date", key: "createdOn" },
    { label: "Description", key: "Description" },
    { label: "Mode", key: "Mode" },
    { label: "Amount	", key: "Amount" },
    // { label: "Balance", key: "PaymentAmount" },
  ];
  // let Url = "http://localhost:5000";
  //   const [BelongsID, setBelongsID] = useState(UserCredentials.UserData.Role);
  //   const [refresher, setRefresher] = useState(false);
  //   let ID = UserCredentials.UserData._id;
  //   console.log(UserCredentials.UserData, "UserCredentials");
  // console.log(allData);

  useEffect(() => {
    if (UserCredentials.UserData.Role == "Admin") {
      axios({
        method: "Post",
        url: Url + "/filteredVoucher",
        data: {
          filter: {
            // BelongsTo: UserCredentials.UserData._id,
            BelongsTo: "63db55cf07ec951109a359c7",
          },
        },
      }).then((response) => {
        console.log(response.data, "smsLedger=>Response");
        setallData(response.data);
      });
    } else {
      axios({
        method: "Post",
        url: Url + "/smsLedger",
        data: {
          filter: {
            createdBy: UserCredentials.UserData.createdBy,
            // "createdBy": "646f09d7d9957a50a32abb4c"
          },
        },
      }).then((response) => {
        // console.log(response.data,"smsLedger=>Response");
        setallData(response.data);
      });
    }
  }, []);

  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };

  return (
    <>
      <div class="card card-cascade narrower">
        <div
          class="container mt-3 overflow-auto"
          style={{ maxHeight: "110vh" }}
        >
          <h2>Vocher Leger</h2>
          <CSVLink
            headers={headers}
            filename="VocherLeger List.csv"
            data={allData}
            ref={csvLinkEl}
          />
          <div className="d-flex flex-row-reverse m-2">
            <button
              class="btn text-white"
              style={{ background: "#427D8F", fontSize: 15 }}
              onClick={downloadReport}
              role="button"
            >
              Export
              <i class="far fa-circle-down mx-2 "></i>
            </button>
          </div>

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
              {allData.map((v) => {
                // <VocherLegerList alldata={v} />

                return (
                  <tr>
                    <td>{moment(v.createdOn).format("llll")}</td>
                    <td>{v.Description}</td>
                    <td>{v.Mode}</td>
                    <td>{v.Amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}