import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
// import { Input } from "antd";
// import moment from "moment";
import "./filter.css";

export default function PaymentFilter({ data }) {
    const [verifycode, setVerifyCode] = useState("");
    const [PaymentName, setName] = useState("");
    const [drawnon, setDrawnOn] = useState("");
    const [paymentstatus, setPaymentStatus] = useState("")



    const filterParams = {
        VerificationCode: verifycode,
        PaymentName: PaymentName,
        drawOn: drawnon,
        PaymentStatus: paymentstatus
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
                        <div class="col-md-3">
                            <div class="col-example z-depth-4 flex-center">
                                <p>
                                    <label class="form-label text-white">
                                        Verify Code<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="text"
                                        name="VerifyCode"
                                        placeholder="Verify Code"
                                        value={verifycode}
                                        onChange={(e) => setVerifyCode(e.target.value)}
                                    />
                                </p>
                            </div>
                        </div>

                        <div class="col-md-3">
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


                        <div class="col-md-3">
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

                        <div class="col-md-3">
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
