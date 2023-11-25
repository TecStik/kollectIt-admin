import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import "../../filter/filter.css";

export default function ViewMemberFilter({ data }) {
    // console.log(data)
    const [employeename, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");



    const filterParams = {
        employeeName: employeename,
        employeeEmail: email,
        Role: role
    };

    // const result = data?.createFilter(filterParams);
    // console.log("Filter ===> component here", result);


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
                                    <label class="form-label text-white">
                                        Employee Name<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="EmployeeName"
                                        placeholder="Employee Name"
                                        value={employeename}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Email<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>


                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Role<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Select
                                        style={{ padding: '15px 10px' }}
                                        type="text"
                                        name="role"
                                        placeholder="Role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="Cashier">Cashier</option>
                                        <option value="Rider">Rider</option>
                                        <option value="Osd">Osd</option>
                                    </Form.Select>
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

