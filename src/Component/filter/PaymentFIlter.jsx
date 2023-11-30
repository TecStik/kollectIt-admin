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

                        <div className="col-md-4">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Name<span className="text-danger"> *</span>
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


                        <div className="col-md-4">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Drawn on<span className="text-danger"> *</span>
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

                        <div className="col-md-4">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Payment Status<span className="text-danger"> *</span>
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
                        <div className="col-md-6">
                            <div className="col-example z-depth-4 flex-center">
                                <p>
                                    <label className="form-label text-white">
                                        Due On<span className="text-danger"> *</span>
                                    </label>
                                    {/* <br /> */}
                                    <p>From</p>
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

                        {/*  payment date filter start date or end date her*/}
                        <div className="col-md-6">
                            <div className="col-example z-depth-4">
                                <p>
                                    <label className="form-label text-white">
                                        Payment Date<span className="text-danger"> *</span>
                                    </label>
                                    <p>From</p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "center" }}>
                                        <Form.Control
                                            style={{ width: '100%' }}
                                            type="date"
                                            name="paymentstartdate"
                                            value={paymentstartdate}
                                            onChange={(e) => setPaymentStartDate(e.target.value)}
                                        />
                                        <div style={{ width: "100%", textAlign: "left", padding: '3px 0px' }}>
                                            <label className="form-label text-white">
                                                Payment Date<span className="text-danger"> *</span>
                                            </label>
                                            <p>To</p>
                                        </div>
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





                        <div className="d-flex">
                            <div className="p-2 w-100">
                                <div className="  flex-center">
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
