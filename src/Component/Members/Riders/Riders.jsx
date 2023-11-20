import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Url } from "../../../Pages/Core";
import StoreContext from "../../../ContextApi";
import Filter from "../../filter/filter";
import {CircularProgress} from "@mui/material";

export default function Riders() {
  const [allData, setallData] = useState([]);
  const UserCredentials = useContext(StoreContext);
  const [filterItem, setfilterItem] = useState(allData);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredEmployee",
      data: {
        filter: {
          createdBy: UserCredentials.UserData._id,
          Role: "Rider",
        },
      },
    }).then((response) => {
      setLoading(false)
      console.log(response.data, "response");
      setallData(response.data);
    });
  }, []);

  return (
    <div class="card card-cascade narrower">
      <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
        <h2>Riders</h2>
        <div className="d-flex flex-row-reverse m-2">
          <div className="m-2">
            {/* <button
            class="btn text-white "
            style={{
              background: "#427D8F",
              fontSize: 15,
              marginTop: "-3%",
            }}
            onClick={downloadReport}
            role="button"
          >
            Export
            <i class="far fa-circle-down mx-2 "></i>
          </button> */}
          </div>
          <div className="m-2">
            <Filter data={{ allData, setfilterItem }} />
          </div>
        </div>
        {
          loading ? <div style={{display:"flex",justifyContent:'center',alignItems:'center'}}>
            <CircularProgress/>
          </div> : <>
            <table class="table table-hover" style={{ position: 'relative' }}>
              <thead
                class="bg-light"
              // style={{ position: "fixed",width:"100%" }}
              >
                <tr>
                  <th>Rider Name</th>
                  <th>Login ID</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Stutus</th>
                  <th>Position</th>
                  <th>Action/Roles</th>
                </tr>
              </thead>
              <tbody>
                {allData.map((v, i) => {
                  return (
                    <tr>
                      <td>{v.employeeName}</td>
                      <td>{v.loginId}</td>
                      <td>{v.employeeEmail}</td>
                      <td>{v.employeePassword}</td>
                      <td>
                        <span class="badge badge-success rounded-pill d-inline">
                          Active
                        </span>
                      </td>
                      <td>Senior</td>
                      <td>
                        <button class="btn btn-primary btn-rounded">
                          {v.Role}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
              <td>Mary</td>
              <td>mary@example.com</td>
              <td>Moe</td>
              <td>
                <span class="badge badge-primary rounded-pill d-inline"
                >Onboarding</span
                >
              </td>
              <td>Junior</td>
            </tr>
            <tr>
              <td>July</td>
              <td>july@example.com</td>
              <td>Dooley</td>
              <td>
                <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
              </td>
              <td>Senior</td>
            </tr> */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </tbody>
            </table>
          </>
        }
      </div>
    </div>
  );
}
