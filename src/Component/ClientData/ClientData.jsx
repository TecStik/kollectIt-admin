import React, { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import './ClientData.css'
import axios from 'axios';
import { Url } from '../../Pages/Core';


export default function ClientData() {

    const [allData, setallData] = useState([])


    useEffect(() => {
        axios({
            method: "get",
            url: Url+"/ClientData",
        }).then((response) => {
            // console.log(response.data,"response")
            setallData(response.data.Data)
        })
    }, [])

    console.log(allData, "allData");

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    return (
        <div>

            <input type="text" id="myInput" onChange={myFunction} placeholder="Search for names.." title="Type in a name"></input>

            <table id="myTable">
                <tr class="header">
                    <th style={{ width: 60 }}>ClientId</th>
                    <th style={{ width: 60 }}>Name</th>
                    <th style={{ width: 60 }}>Number</th>
                    <th style={{ width: 60 }}>Email</th>
                    <th style={{ width: 60 }}>Amount</th>
                    <th style={{ width: 60 }}></th>
                    <th style={{ width: 40 }}></th>
                </tr>
                {allData.map((v, index) => {
                    return (
                        <tr>
                            <td>{v.ClientId}</td>
                            <td>{v.ClientName}</td>
                            <td>{v.ClientPhoneNumber}</td>
                            <td>{v.ClientEmail}</td>
                            <td>{v.ClientAmount}</td>
                        </tr>
                    )
                })}
            </table>


        </div>
    );
};
