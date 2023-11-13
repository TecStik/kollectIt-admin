import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";


import "./filter.css";
export default function PaymentFilter({ data }) {
    // console.log(data)
    const [PaymentName, setName] = useState("");
    const [drawnon, setDrawnOn] = useState("");
    const [paymentstatus, setPaymentStatus] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");;
    const [paymentstartdate, setPaymentStartDate] = useState("");
    const [paymentenddate, setPaymentEndDate] = useState("");




    const filterParams = {
        PaymentName: PaymentName,
        drawOn: drawnon,
        PaymentStatus: paymentstatus,
        dueOn: startdate,
        enddate: enddate,
        createdOn: paymentstartdate,
        paymentenddate: paymentenddate
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
                                        Name<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        placeholder="Name"
                                        value={PaymentName}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>


                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Drawn on<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="Drawnon"
                                        placeholder="Drawn On"
                                        value={drawnon}
                                        onChange={(e) => setDrawnOn(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Payment Status<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="PaymentStatus"
                                        placeholder="Payment Status"
                                        value={paymentstatus}
                                        onChange={(e) => setPaymentStatus(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        {/* due on start date or end date filter here */}
                        <div class="col-md-6">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Due On From<span class="text-danger"> *</span>
                                    </label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "center" }}>
                                        <Form.Control
                                            style={{ width: '100%' }}
                                            type="date"
                                            name="startdate"
                                            placeholder="startdate"
                                            value={startdate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <label class="form-label text-white" style={{ width: '100%', textAlign: "left", padding: "2px 0px" }}>
                                            Due On To<span class="text-danger"> *</span>
                                        </label>
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

                        {/*  payment date filter start date or end date her*/}
                        <div class="col-md-6">
                            <div class="col-example z-depth-4">
                                <p>
                                    <label class="form-label text-white">
                                        Payment Date From<span class="text-danger"> *</span>
                                    </label>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "center" }}>
                                        <Form.Control
                                            style={{ width: '100%' }}
                                            type="date"
                                            name="paymentstartdate"
                                            value={paymentstartdate}
                                            onChange={(e) => setPaymentStartDate(e.target.value)}
                                        />
                                        <label class="form-label text-white" style={{width:"100%",padding:"2px 0px"}}>
                                            Payment Date To<span class="text-danger"> *</span>
                                        </label>
                                        <Form.Control
                                            style={{ width: '100%' }}
                                            type="date"
                                            name="enddate"
                                            placeholder="enddate"
                                            value={paymentenddate}
                                            onChange={(e) => setPaymentEndDate(e.target.value)}
                                        />
                                    </div>
                                </p>
                            </div>
                        </div>





                        <div class="d-flex">
                            <div class="p-2 w-100">s

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
