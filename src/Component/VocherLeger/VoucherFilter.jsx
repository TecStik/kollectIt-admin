import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
// import { Input } from "antd";
// import moment from "moment";
import "../filter/filter.css";

export default function Filter({ data }) {
    // const [clientid, setClientId] = useState("");
    // const [clientname, setClientName] = useState("");
    // const [clientPhoneNumber, setClientPhoneNumber] = useState("");
    // const [clientEmail, setClientEmail] = useState("")
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [mode, setMode] = useState("");

    const filterParams = {
        Mode: mode,
        createdOn: startdate,
        paymentenddate: enddate
    };

    // const result = data?.createFilter(filterParams);
    // console.log("Filter ===> component here", result);


    function handler() {
        data?.createFilter(filterParams);
    }


    return (
        <div>
            <div className="d-flex">
                <div className="p-2 w-100"></div>
                <div className="flex-shrink-1">
                    <a
                        className="btn btn-primary"
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

            <div className="collapse mt-3" id="collapseExample">
                <div>
                    <div className="row mb-5 mx-5" id="filterColor">
                        <div className="col-md-6">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <div style={{ width: '100%', textAlign: "left" }}>
                                        <label className="form-label text-white">
                                            Due On<span className="text-danger"> *</span>
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

                        <div className="col-md-6">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Mode<span className="text-danger"> *</span>
                                    </label>
                                    <Form.Select
                                    value={mode}
                                    onChange={(e)=> setMode(e.target.value)}
                                    style={{position:"relative",top:"33px"}}
                                    >
                                        <option value="Debit">Debit</option>
                                        <option value="Credit">Credit</option>
                                    </Form.Select>
                                </p>
                            </div>
                        </div>

                        <div className="d-flex">
                            <div className="p-2 w-100">

                                <div className="flex-center">
                                    <p className="white-text">
                                        <button
                                            id="search-button"
                                            type="button"
                                            onClick={handler}
                                            className="btn btn-secondary"
                                        >
                                            <i className="fas fa-search"></i> Search
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
