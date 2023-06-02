import axios from 'axios';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Url } from '../../Pages/Core';



export default function QuotaList(data) {

    const [employeeData, setemployeeData] = useState([])
    const [BelongsID, setBelongsID] = useState("")
    const [QuotaValue, setQuotaValue] = useState(null)
    // const value = React.useMemo(() => updateValue(BelongsID), [BelongsID])
    const [ClientData, setClientData] = useState([])
    // const [realTime, setRealTime] = useState(true);
    // console.log(data.alldata, "dataaaaa");
    // console.log(data.alldata.Sender, "Sender");

    useEffect(() => {
        axios({
            method: "post",
            url: 'http://localhost:5000/filteredEmployee',
            data: {
                "filter": {
                    "_id": data.alldata.Sender
                }
            }
        }).then((response) => {
            // console.log(response.data, "Sender");
            setemployeeData(response.data[0].employeeName)
        })




    }, [])



    const createBelongsID = (v) => {
        setBelongsID(v.BelongsTo)
    }


    useEffect(() => {
        axios({
            method: "post",
            url: 'http://localhost:5000/filteredClients',
            data: {
                "filter": {
                    "_id": data.alldata.Reciver
                }
            }
        }).then((response) => {
            setClientData(response.data[0].ClientName)
        })
    }, [])

    console.log(ClientData, "filter Clients===> Reciver");

    return (
        <>
            <tr>
                <td>{data.alldata.createdOn}</td>
                <td>{data.alldata.Mode}</td>
                <td>{data.alldata.Qty}</td>
                {""}
                {/* {employeeData.map((v, i) => { return (<td>{v.employeeName}</td>) })} */}
                <td>{employeeData}</td>
                <td>{ClientData}</td>
                {/* {ClientData.map((v, i) => { return (<td>{v.ClientName}</td>) })}  */}
            </tr>

            <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h1 class="modal-title">Limits Update</h1>
                            <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            <table id="myTable">
                                <th style={{ width: 60 }}><input type="text" placeholder='Quata Amount' onChange={(e) => setQuotaValue(e.target.value)} /></th>
                            </table>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
                            {/* <button id='sumbit' aria-label='' onClick={handleSubmit} class="btn btn-success close" data-dismiss="modal"> SUMBIT</button> */}
                            {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
                            {/* <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button> */}
                        </div>

                    </div>
                </div>
            </div>
        </>


    )
}

// const updateValue = (id) => {
//     // console.log("ID", id)
//     return id
// }