import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import "../filter/filter";


export default function TransactionFilter({ data }) {
    // console.log(data)
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");;
    const [nature, setNature] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");


    console.log(nature)

    const filterParams = {
        createdOn: startdate,
        enddate: enddate,
        Nature: nature,
        fromName: from,
        toName: to
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

            <div className="collapse mt-3" id="collapseExample">
                <div>
                    <div className="row mb-5 mx-5" id="filterColor">

                        <div className="col-md-3">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <div style={{ width: '100%', textAlign: "left", padding: "2px 0px" }}>
                                        <label className="form-label text-white">
                                            Date<span className="text-danger"> *</span>
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
                                        <div style={{ width: '100%', textAlign: "left", padding: '2px 0px' }}>
                                            <label className="form-label text-white">
                                                Date<span className="text-danger"> *</span>
                                            </label>
                                            <p>To</p>
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

                        <div className="col-md-3" style={{position:"relative",top:"8px"}}>
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Nature<span className="text-danger"> *</span>
                                    </label>
                                    <Form.Select style={{padding:"15px 10px"}}  value={nature} onChange={(e) => setNature(e.target.value)}>
                                        <option value="Collection">Collection</option>
                                        <option value="Internal Transfer">Internal Transfer</option>
                                    </Form.Select>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        From<span className="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="From"
                                        placeholder="From"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        To<span className="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="To"
                                        placeholder="To"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>



                        <div className="d-flex">
                            <div className="p-2 w-100">

                                <div className="  flex-center">
                                    <p className="white-text">
                                        <button
                                            id="search-button"
                                            type="button"
                                            onClick={handler}
                                            class="btn btn-secondary"
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
