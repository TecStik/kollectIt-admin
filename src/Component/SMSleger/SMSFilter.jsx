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
            <div className="d-flex">
                <div className="p-2 w-100"></div>
                <div className="flex-shrink-1">
                    <a className="btn btn-primary"
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
                        <div className="col-md-4">
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
                                            <label className="form-label text-white" >
                                                Due On<span className="text-danger"> *</span>
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

                        <div className="col-md-4">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Sender<span className="text-danger"> *</span>
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

                        <div className="col-md-4">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Client<span className="text-danger"> *</span>
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


                        <div className="d-flex">
                            <div className="p-2 w-100">

                                <div classNam="  flex-center">
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
