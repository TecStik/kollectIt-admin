import axios from "axios";
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Url } from "../../Pages/Core";
import { ToastContainer, toast } from "react-toastify";

export default function QuotaList(data) {
  const [allData, setallData] = useState([]);
  const [BelongsID, setBelongsID] = useState("");
  const [QuotaValue, setQuotaValue] = useState(null);
  const [CreditValue, setCreditValue] = useState(null);
  const value = React.useMemo(() => updateValue(BelongsID), [BelongsID]);
  const value1 = React.useMemo(() => updateValue(BelongsID), [BelongsID]);
  const [realTime, setRealTime] = useState(true);

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
      // console.log(response.data[0].CreditBalance,"filter Quoto");
      setallData(response.data);
    });
  }, [realTime]);

  const createBelongsID = (v) => {
    setBelongsID(v.BelongsTo);
  };

  const notify = () =>
    toast.success("Update Quota Successfully!", {
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
      url: Url + "/UpadateQuota",
      data: {
        BelongsTo: e.target.ariaLabel,
        Limit: QuotaValue,
      },
    }).then((response) => {
      // if (response.data.message == "Limit Update") {
      //     console.log(';kjk')
      // }
      console.log(response);
      setRealTime(!realTime);
    });
  };

  const handleSubmitCredit = (e) => {
    console.log(e.target.ariaLabel, "sss");
    axios({
      method: "post",
        url: Url + "/UpdateCrediteBlance",
      // url: "http://localhost:5000/UpdateCrediteBlance",
      data: {
        BelongsTo: e.target.ariaLabel,
        amount: CreditValue,
      },
    }).then((response) => {
      // if (response.data.message == "Limit Update") {
      //     console.log(';kjk')
      // }
      notify();
      console.log(response);

      setRealTime(!realTime);
    });
  };

  return (
    <>
      <ToastContainer />
      <tr>
        <td>{data.alldata.employeeName}</td>
        <td>{data.alldata.employeeEmail}</td>
        {allData.map((v, i) => {
          //   console.log(v.CreditBalance);
          return (
            <>
              <td>{v.Limit}</td>
              <td>{v.CreditBalance}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-dark btn-rounded"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={() => createBelongsID(v)}
                >
                  Update Quota
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-dark btn-rounded"
                  data-toggle="modal"
                  data-target="#myCredit"
                  onClick={() => createBelongsID(v)}
                >
                  Update Credit
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
                    placeholder="Quata Amount"
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
                class="btn btn-success close"
                data-dismiss="modal"
              >
                {" "}
                SUMBIT
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
              <h1 className="modal-title">Update Credit</h1>
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
                    placeholder="Credit Amount"
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
                {" "}
                SUMBIT
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
