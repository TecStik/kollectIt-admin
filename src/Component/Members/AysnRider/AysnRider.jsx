import axios from "axios";
import { Button, Modal } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { Url } from "../../../Pages/Core";
import StoreContext from "../../../ContextApi";
import Filter from "../../filter/filter";


export default function AysnRider() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allData, setallData] = useState([]);
  const [Client, setClient] = useState([]);
  const [ClinetID, setClinetID] = useState(null);
  const [realTime, setRealTime] = useState(true);
  const [filterItem, setfilterItem] = useState(allData);
  const UserCredentials = useContext(StoreContext);
  // console.log(UserCredentials.UserData._id, "raza");
  useEffect(() => {
    // axios({
    //     method: "get",
    //     url: Url + "/ClientData",
    // }).then((response) => {
    //     // console.log(response.data,"response")
    //     setClient(response.data.Data)
    // })AssignedBy

    if (UserCredentials.UserData.Role === "Admin") {
      axios({
        method: "post",
        url: Url + "/filteredClients",
        data: {
          filter: {
            BelongsTo: UserCredentials.UserData._id,
          },
        },
      }).then((response) => {
        setClient(response.data);
      });
    } else {
      axios({
        method: "post",
        url: Url + "/filteredClients",
        data: {
          filter: {
            AssignedBy: UserCredentials.UserData._id,
          },
        },
      }).then((response) => {
        setClient(response.data);
      });
    }
  }, [realTime]);

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
      console.log(response.data, "response");
      setallData(response.data);
    });
  }, []);

  // const showModal = () => {
  //     setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //     setIsModalVisible(false);
  //     console.log("m")
  // };

  // const handleCancel = () => {
  //     setIsModalVisible(false);
  // };

  function Rider(RiderName) {
    console.log(ClinetID, "eee");
    axios({
      method: "post",
      url: Url + "/ClientDataUpdate",
      data: {
        id: ClinetID,
        ClientRider: RiderName,
      },
    })
      .then((res) => {
        console.log(res.data.message, "res");
        alert(res.data.message);
        setRealTime(!realTime);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }




  return (
    <div className="modal-dialog-scrollable">
      <div className="card card-cascade narrower ">
        <div className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">
          <div>
            <button
              type="button"
              className="btn btn-outline-white btn-rounded btn-sm px-2"
            >
              <i className="fas fa-th-large mt-0"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-white btn-rounded btn-sm px-2"
            >
              <i className="fas fa-columns mt-0"></i>
            </button>
          </div>

          <a href="" className="white-text mx-3">
            Allow Access
          </a>
          <div>
            {/* <button
              type="button"
              class="btn btn-outline-white btn-rounded btn-sm px-2"
            >
              <i class="fas fa-pencil-alt mt-0"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-white btn-rounded btn-sm px-2"
            >
              <i class="far fa-trash-alt mt-0"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-white btn-rounded btn-sm px-2"
            >
              <i class="fas fa-info-circle mt-0"></i>
            </button> */}
          </div>
        </div>
        <div className="container overflow-auto" style={{ maxHeight: "110vh" }}>
          <h2>Assign Rider</h2>
          <div className="d-flex flex-row-reverse m-2">
            <div className="m-2">
              {/* <button
            class="btn text-white "
            style={{
              background: "#427D8F",
              fontSize: 15,F
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

          <table className="table table-hover ">
            <thead className="bg-light">
              <tr>
                <th>Client ID</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>Amount</th>
                {/* <th>Stutus</th> */}
                <th>Allow Rider Name</th>
                <th>Assign Rider</th>
              </tr>
            </thead>
            {Client?.map((v, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{v?.ClientId}</td>
                    <td>{v?.ClientName}</td>
                    <td>{v?.ClientEmail}</td>
                    <td>{v?.ClientPhoneNumber}</td>
                    <td>{v?.ClientAmount}</td>
                    <td>
                      <span className="badge badge-warning rounded-pill d-inline">
                        {v.ClientRider}
                      </span>
                    </td>
                    <td>
                      <button
                      style={{width:'90px',fontSize:"14px",padding:'10px'}}
                        type="button"
                        className="btn btn-primary btn-rounded"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => setClinetID(v._id)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
      
        </div>

        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content" style={{ width: "115%" }}>
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h1 className="modal-title">Rider Name</h1>
                <button
                  type="button"
                  className="btn btn-danger close"
                  data-dismiss="modal"
                >
                  X
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <table id="myTable">
                  <tr className="header">
                    {/* <th style={{ width: 60 }}>RiderId</th> */}
                    <th style={{ width: 60 }}>Name</th>
                    <th style={{ width: 60 }}>Number</th>
                    <th style={{ width: 60 }}>Assign Rider</th>
                  </tr>
                  {allData.map((v, index) => {
                    return (
                      <tr>
                        <td>{v.employeeName}</td>
                        <td>{v.employeeEmail}</td>
                        {/* <td>{v.employeePassword}</td> */}
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => Rider(v.employeeName)}
                            data-dismiss="modal"
                          >
                            Allow
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
