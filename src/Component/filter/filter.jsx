import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
// import { Input } from "antd";
// import moment from "moment";
import "./filter.css";

export default function Filter({ data }) {
  const [clientid, setClientId] = useState("");
  const [clientname, setClientName] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("")



  const filterParams = {
    ClientId: clientid,
    ClientName: clientname,
    ClientPhoneNumber: clientPhoneNumber,
    ClientEmail: clientEmail
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
                    Client Id<span class="text-danger"> *</span>
                  </label>
                  <Form.Control
                    type="text"
                    name="ClientId"
                    placeholder="Client Id"
                    value={clientid}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-example z-depth-4 flex-center">
                <p>
                  <label class="form-label text-white">
                    Client Name<span class="text-danger"> *</span>
                  </label>
                  <Form.Control
                    type="text"
                    name="ClientName"
                    placeholder="Client Name"
                    value={clientname}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </p>
              </div>
            </div>


            <div class="col-md-3">
              <div class="col-example z-depth-4 flex-center">
                <p>
                  <label class="form-label text-white">
                    Client Number<span class="text-danger"> *</span>
                  </label>
                  <Form.Control
                    type="text"
                    name="ClientPhoneNumber"
                    placeholder="Client Phone Number"
                    value={clientPhoneNumber}
                    onChange={(e) => setClientPhoneNumber(e.target.value)}
                  />
                </p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-example z-depth-4 flex-center">
                <p>
                  <label class="form-label text-white">
                    Client Email<span class="text-danger"> *</span>
                  </label>
                  <Form.Control
                    type="text"
                    name="ClientEmail"
                    placeholder="Client Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
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
