import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Url } from '../../../Pages/Core'



export default function AdminList(data) {

    // console.log(data, "AllData.data");
    const [Limits, setLimits] = useState([])

    useEffect(() => {
        axios({
            method: "post",
            url: Url + "/filteredQuota",
            data: {
                "filter": {
                    "BelongsTo": data.alldata._id
                }
            }
        }).then((response) => {
            console.log(response.data, "filter Data")
            setLimits(response.data)
        })
    }, [])


    return (
        <>
            <tr>
                <td>{data.alldata.employeeName}</td>
                <td>{data.alldata.loginId}</td>
                <td>{data.alldata.employeeEmail}</td>
                <td>{data.alldata.employeePassword}</td>
                <td>
                    <span className="badge badge-success rounded-pill d-inline">Active</span>
                </td>
                <td>Senior</td>
                <td>{""}
                    {Limits.map((v, i) => {
                        return (
                            <>{v.Limit}</>
                        )
                    })}
                </td>
                <td><button className="btn btn-warning btn-rounded" >{data.alldata.Role}</button></td>
            </tr>
        </>
    )
}
