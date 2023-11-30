import axios from "axios";
import React, { useEffect, useState } from "react";
import { Url } from "../../Pages/Core";
import moment from "moment";

export default function QuotaList(data) {
  const [employeeData, setemployeeData] = useState([]);
  const [ClientData, setClientData] = useState([]);
  const [QuotaValue, setQuotaValue] = useState(null);
  // const [BelongsID, setBelongsID] = useState("")
  // const value = React.useMemo(() => updateValue(BelongsID), [BelongsID])
  // const [realTime, setRealTime] = useState(true);
  // console.log(data.alldata, "dataaaaa");
  // console.log(data.alldata.Sender, "Sender");

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredEmployee",
      data: {
        filter: {
          _id: data.alldata.Sender,
        },
      },
    }).then((response) => {
      // console.log(response.data, "Sender");
      setemployeeData(response.data[0].employeeName);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredClients",
      data: {
        filter: {
          _id: data.alldata.Reciver,
        },
      },
    }).then((response) => {
      setClientData(response.data[0].ClientName);
    });
  }, []);

  console.log(ClientData, "filter Clients===> Reciver");

  return (
    <>
      <tr>
        <td>{moment(data.alldata.createdOn).format("llll")}</td>
        <td>{data.alldata.Mode}</td>
        <td>{data.alldata.Qty}</td>
        {/* {employeeData.map((v, i) => { return (<td>{v.employeeName}</td>) })} */}
        <td>{employeeData}</td>
        <td>{ClientData}</td>
        {/* {ClientData.map((v, i) => { return (<td>{v.ClientName}</td>) })}  */}
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
              {/* <button id='sumbit' aria-label='' onClick={handleSubmit} class="btn btn-success close" data-dismiss="modal"> SUMBIT</button> */}
              {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
              {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const updateValue = (id) => {
//     // console.log("ID", id)
//     return id
// }
