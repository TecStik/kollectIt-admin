import React, { useEffect, useState, useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Url } from "../../Pages/Core";

export default function AddQuotaList(data) {
  // console.log(data)
  const [allData, setallData] = useState([]);
  const [BelongsID, setBelongsID] = useState("");
  const [CreditValue, setCreditValue] = useState(null);
  const [QuotaValue, setQuotaValue] = useState(null);
  const value = React.useMemo(() => updateValue(BelongsID), [BelongsID]);
  const value1 = React.useMemo(() => updateValue(BelongsID), [BelongsID]);
  const [realTime, setRealTime] = useState(true);

  const headers = [
    { label: "Admin Name", key: "employeeName" },
    { label: "Email", key: "employeeEmail" },
    { label: "Limit", key: "Limit" },
    { label: "Credit Blance", key: "CreditBalance" },
  ];

  useEffect(() => {
    // setreloadData(false)
    axios({
      method: "post",
      url: Url + "/filteredQuota",
      data: {
        filter: {
          BelongsTo: data.alldata._id,
        },
      },
    }).then((response) => {
      setallData(response.data);
    });
  }, [realTime]);

  const createBelongsID = (v) => {
    setBelongsID(v.BelongsTo);
  };
  const notify = (message) =>
    toast.success(`Adding  ${message} Successfully!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    document.getElementById("sumbit").setAttribute("aria-label", value);
  }, [value]);

  useEffect(() => {
    document.getElementById("sumbitt").setAttribute("aria-label", value1);
  }, [value1]);

  const handleSubmit = (e) => {
    // console.log('KJKJ', e.target.ariaLabel)
    axios({
      method: "post",
      url: Url + "/AddQuota",
      data: {
        BelongsTo: e.target.ariaLabel,
        amount: parseInt(QuotaValue),
      },
    }).then((response) => {
      // if (response.data.message == "Limit Update") {
      //     console.log(';kjk')
      // }
      notify("Quota");
      console.log(response);
      setRealTime(!realTime);
    });
  };

  const handleSubmitCredit = (e) => {
    console.log(e.target.ariaLabel, "sss");
    axios({
      method: "post",
      // url: Url + "/UpdateCrediteBlance",
      url: Url + "/AddCredit",
      // url: "http://localhost:5000/AddCredit",
      data: {
        BelongsTo: e.target.ariaLabel,
        amount: Number(CreditValue),
      },
    }).then((response) => {
      // if (response.data.message == "Limit Update") {
      //     console.log(';kjk')
      // }

      console.log(response);
      setRealTime(!realTime);
      notify("Credit");
    });
  };

  return (
    <>
      <ToastContainer />
      <tr>
        <td>{data.alldata.employeeName}</td>
        <td>{data.alldata.employeeEmail}</td>

        {allData.map((v, i) => {
          // console.log(v.BelongsTo);
          return (
            <>
              <td>{v.Limit}</td>
              <td>{v.CreditBalance}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-rounded"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => createBelongsID(v)}
                  style={{ width: "19vh" }}
                >
                  Add Quota
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-dark btn-rounded"
                  data-toggle="modal"
                  data-target="#myCredit"
                  onClick={() => createBelongsID(v)}
                  style={{ width: "19vh" }}
                >
                  Add Credit
                </button>
              </td>
            </>
          );
        })}
        {/* </td> */}
      </tr>

      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content" style={{ width: "115%" }}>
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h1 className="modal-title">Limits Update</h1>
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
                <th style={{ width: 60 }}>
                  <input
                    type="text"
                    placeholder="Quota Amount"
                    onChange={(e) => setQuotaValue(e.target.value)}
                  />
                </th>
              </table>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
              <button
                id="sumbit"
                aria-label=""
                onClick={handleSubmit}
                className="btn btn-success close"
                data-dismiss="modal"
              >
                SUBMIT
              </button>
              {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="myCredit">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content" style={{ width: "115%" }}>
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h1 className="modal-title">Add Credit</h1>
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
                <th style={{ width: 60 }}>
                  <input
                    type="text"
                    placeholder="Add Credit Amount"
                    onChange={(e) => setCreditValue(e.target.value)}
                  />
                </th>
              </table>
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
              <button
                id="sumbitt"
                aria-label=""
                onClick={handleSubmitCredit}
                className="btn btn-success close"
                data-dismiss="modal"
              >
                SUBMIT
              </button>
              {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
              <button type="button" className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const updateValue = (id) => {
  console.log("ID", id);
  return id;
};
