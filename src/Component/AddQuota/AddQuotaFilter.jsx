import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
// import { Input } from "antd";
// import moment from "moment";
import "../filter/filter.css";

export default function AddQuotaFilter({ data }) {
    const [adminname, setAdminName] = useState("");
    const [email, setEmail] = useState("");



    const filterParams = {
        employeeName: adminname,
        employeeEmail: email,
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
                                    <label className="form-label text-white">
                                        Admin Name<span className="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="ClientId"
                                        placeholder="Admin Name"
                                        value={adminname}
                                        onChange={(e) => setAdminName(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Email<span className="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="ClientName"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>



                        <div className="d-flex">
                            <div className="p-2 w-100">s

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
