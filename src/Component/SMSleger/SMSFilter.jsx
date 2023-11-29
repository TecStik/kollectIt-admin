import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
// import { Input } from "antd";
// import moment from "moment";
import "../filter/filter.css";

export default function Filter({ data }) {
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [sender, setSender] = useState("");
    const [client, setClient] = useState("");

    const filterParams = {
        // ClientId: clientid,
        // ClientName: clientname,
        // ClientPhoneNumber: clientPhoneNumber,
        // ClientEmail: clientEmail
    };

    function handler() {
        data?.createFilter(filterParams);
    }


    return (
        <div>
            <div class="d-flex">
                <div class="p-2 w-100"></div>
                <div class="flex-shrink-1">
                    <a
                        class="btn btn-primary"
                        data-mdb-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        id="filter-button"
                        aria-controls="collapseExample"
                        style={{
                            background: "#427D8F",
                            fontSize: 15,
                            marginTop: "-3%",
                            padding: 10,
                        }}
                    >
                        Filter
                    </a>
                </div>
            </div>

            {/* <!-- Collapsed content --> */}

            <div class="collapse mt-3" id="collapseExample">
                <div>
                    <div class="row mb-5 mx-5" id="filterColor">
                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <div style={{width:'100%',textAlign:"left"}}>
                                        <label class="form-label text-white">
                                            Due On<span class="text-danger"> *</span>
                                        </label>
                                        <p>From</p>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "center" }}>
                                        <Form.Control
                                            style={{ width: '100%' }}
                                            type="date"
                                            name="startdate"
                                            placeholder="startdate"
                                            value={startdate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <div style={{ width: "100%", textAlign: "left", padding: '3px 0px' }}>
                                            <label class="form-label text-white" >
                                                Due On<span class="text-danger"> *</span>
                                            </label>
                                            <p >To</p>
                                        </div>
                                        <Form.Control
                                            style={{ width: '100%' }}
                                            type="date"
                                            name="enddate"
                                            placeholder="enddate"
                                            value={enddate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Sender<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="Sender"
                                        placeholder="Sender"
                                        value={sender}
                                        onChange={(e) => setSender(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Client<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="Client"
                                        placeholder="Client"
                                        value={client}
                                        onChange={(e) => setClient(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>


                        <div class="d-flex">
                            <div class="p-2 w-100">

                                <div class="  flex-center">
                                    <p class="white-text">
                                        <button
                                            id="search-button"
                                            type="button"
                                            onClick={handler}
                                            class="btn btn-secondary"
                                        >
                                            <i class="fas fa-search"></i> Search
                                        </button>
                                    </p>
                                    {/* <div class="col-md-2"> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
