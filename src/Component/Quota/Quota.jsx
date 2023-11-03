import React, { useState, useEffect, useCallback } from "react";
import { Url } from "../../Pages/Core";
import axios from "axios";
import QuotaList from "./QuotaList";

export default function Quota() {
  const [allData, setallData] = useState([]);
  const [refresher, setRefresher] = useState(false);

  const getAllData = () => {
    console.log("ll");
    axios({
      method: "get",
      url: Url + "/auth/AdminEmploye",
    }).then((response) => {
      console.log(response.data, "response");
      setallData(response.data);
    });
  };

  useEffect(getAllData, []);

  return (
    <>
      <div className="card card-cascade narrower">
        <div className="container mt-3">
          <h2>Quota</h2>

          <table className="table table-hover">
            <thead className="bg-light">
              <tr>
                <th>Admin Name</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                {/* <th>Stutus</th> */}
                {/* <th>Position</th> */}
                <th>Quota</th>
                <th>Credit Blance</th>
                <th>Add Quota</th>
                <th>Add Credit</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((v) => (
                <QuotaList alldata={v} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
