import React, { useEffect, useState, useContext, useRef } from "react";
import "./TopUP.css";
import Table from "./Table.jsx";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";
import CryptoJS from "crypto-js";
import PropTypes from "prop-types";
// dropdown component here
import SeparateDropDown from "./SeparateDropDown";
import SeparateVoucherComponent from "../VocherLeger/SeparateVoucherComponent";
import {
  Divider,
  Button
} from '@chakra-ui/react'
//material ui modal import her



// circular loader function timer here
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
// propType
CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};


export default function TopUP() {
  const UserCredentials = useContext(StoreContext).UserData;
  const [OrderId, setOrderId] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  const [merchant, setMerchant] = useState("");
  const [CreditBalance, setCreditBalance] = useState("");
  const [PaymentAmount, setPaymentAmount] = useState("");
  const [netAmount, setnetAmount] = useState(0.0);
  const [FunAuthToken, setFunAuthToken] = useState("");
  const [billObject, setBillObject] = useState(null);
  const [merchantObject, setMerchantObject] = useState(null);
  const [allData, setallData] = useState([])
  const [loading, setLoading] = useState(true);
  const [testLoading, setTestLoading] = useState(false)
  // loading usestate
  const [progress, setProgress] = useState(10);


  //  time loader useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (billObject) {
      console.log("BillObject in use effect", billObject);
      setOrderId(billObject.Bill_Number);

      setMerchant(merchantObject.MerchantName);
      setOrderDate(billObject.Due_date.toString());
    }
  }, [billObject]);

  // console.log(UserCredentials, "PaymentAmount");
  let JazzMobiNum = useRef();
  let JazzCNIC = useRef();

  function JazzCashHandler(e) {
    // e.preventdefault();
    let body = {
      JazzMobiNum: JazzMobiNum.current.value,
      JazzCNIC: JazzCNIC.current.value,
    };
    console.log(body, "Jazz Cash");
  }

  useEffect(() => {
    // setreloadData(false)

    axios({
      method: "post",
      url: Url + "/filteredQuota",
      data: {
        filter: {
          BelongsTo: UserCredentials?._id,
        },
      },
    }).then((response) => {
      setCreditBalance(response.data);
      console.log(response.data, "=================>allData");
    });
  }, []);

  useEffect(() => {
    getRandomNumber(); // Random Number Generate
    // percentage(2.5, 10000); // Calculate Percentage
    PayOff(); // auth_token Generate
  }, []);

  function getRandomNumber() {
    let Letters = "0123456789ABCDEF";
    let RandomNum = "9";
    for (let i = 0; i < 8; i++) {
      RandomNum += Letters[Math.floor(Math.random() * 16)];
    }
    setOrderId("Order-1234");
  }

  function percentage(percent, amount) {
    let netAmnt = parseFloat(amount) / (1 - parseFloat(percent) / 100);
    console.log("NetAmount as calculated", netAmnt, percent, amount);
    setnetAmount(netAmnt);
  }
  const handleBill = async () => {
    percentage(2.5, PaymentAmount);
    let data = {
      clientName: UserCredentials.employeeName,
      clientId: "UserCredentials.employeeEmail",
      clientObjId: UserCredentials._id,
      amount: netAmount,
    };
    generateBilll(data);
  };
  async function generateBilll(payload) {
    let today = new Date();
    console.log("Payload", payload);
    let billmonth =
      today.getFullYear().toString().slice(-2) +
      (today.getMonth() + 1).toString();
    console.log("Bill Month", billmonth);
    let dueDate =
      today.getFullYear().toString() +
      (today.getMonth() + 1).toString() +
      today.getDate().toString();
    console.log("Bill Month", billmonth, "----", dueDate);

    axios({
      method: "post",
      url: Url + "/kuickpay/generateBill",
      data: {
        ClientId: payload.clientId,
        ClientObjectId: payload.clientObjId,
        ClientName: payload.clientName,
        Due_date: dueDate,
        Aamount_within_dueDate: netAmount,
        Amount_after_dueDate: netAmount,
        Billing_month: billmonth,
        MerchantId: "00001",
      },
    })
      .then((res) => {
        setTestLoading(true);
        console.log("Response from Generate Bill", res.data);
        setBillObject(res.data.bill);
        setMerchantObject(res.data.merchant);
        alert("You Successfully Generated Bill in our system");
        console.log("Bill Object", billObject);

        setTimeout(() => {
          setTestLoading(false)
        }, 2000); // Simulated delay for demonstration
      })
      .catch((err) => {
        console.log("zerror in Generatebill", err);
      });
  }

  // pagination data here 
  useEffect(() => {
    if (UserCredentials?.UserData?.Role == "Admin") {
      axios({
        method: "Post",
        url: Url + "/filteredVoucher",
        data: {
          filter: {
            BelongsTo: UserCredentials?.UserData?._id,
            Mode: "Credit"
            // BelongsTo: "63db55cf07ec951109a359c7",
          },
        },
      }).then((response) => {
        console.log(response.data)
        setallData(response?.data, "Voucher Data. Pagination component");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    } else {
      axios({
        method: "Post",
        url: Url + "/smsLedger",
        data: {
          filter: {
            createdBy: UserCredentials?.UserData?.createdBy,
            // "createdBy": "646f09d7d9957a50a32abb4c"
          },
        },
      }).then((response) => {
        // console.log(response.data,"smsLedger=>Response");
        setallData(response?.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    }
  }, [allData])





  function PayOff() {
    axios({
      url: "https://testcheckout.kuickpay.com/api/KPToken",
      method: "post",
      data: {
        InstitutionID: "01234",
        KuickpaySecuredKey: "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI=",
      },
    }).then((res) => {
      setFunAuthToken(res.data);
      console.log(res.data, "auth Token response ");
    });
  }

  return (
    <div>
      <div class="col-12 mb-4">
        <div class="row box-right">
          <div class="col-md-4 ps-0 ">
            <p class="ps-3 textmuted fw-bold h6 mb-0">Your Balance</p>

            <p class="h1 fw-bold d-flex">
              <span class=" fas fa-dollar-sign textmuted pe-1 h6 align-text-top mt-1"></span>
              {CreditBalance[0] ? (
                <>{CreditBalance[0].CreditBalance}</>
              ) : (
                <>00</>
              )}
              <span class="textmuted"></span>
            </p>
            <p class="ms-3 px-2 bg-green">+10% since last month</p>
          </div>

          <div class="col-md-4">
            <p class="text-warning mb-0">Payment Amount</p>
            <input
              type="text"
              placeholder="Your Amount"
              // ref={AdminAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <div class="col-md-4 mt-2">
            {testLoading ? (
              <CircularProgress className="progress__loader mt-4" />
              // <h3>LOADING...</h3>
            ) : (
              <button
                // style={{cursor:"pointer"}}
                className="btn btn-primary mt-4"
                onClick={handleBill}
              >
                get Bill
              </button>
            )}
            {/* add dropdown component here */}
            <SeparateDropDown />
            {/* end dropdown component here */}
          </div>
        </div>
      </div>

      {/* <button type="button" class="btn btn-primary mt-4" onClick={PayOff}>
        Pay Off
      </button> */}
      {/* loading start here */}

      {testLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgressWithLabel value={progress} />
        </Box>
      ) : (
        <>
          {/* =========================> TABS */}
          {!billObject && <SeparateVoucherComponent allData={allData} loading={loading} />}

          {/* =========================> Payment  Amount field*/}

          {/* =========================>First TABS Content*/}

          {billObject != null ? (
            <>
              <Table billObject={billObject} />
              <Divider />
              <form
                method="post"
                action="https://testcheckout.kuickpay.com/api/Redirection"
                style={{ textAlign: "start", fontWeight: "unset" }}
              >
                <input type="hidden" name="InstitutionID" Value="01234" />
                <input type="hidden" name="OrderID" Value={OrderId} />

                <input
                  type="hidden"
                  name="MerchantName"
                  Value={merchant}
                  className="bg-white"
                />
                <input
                  type="hidden"
                  name="TransactionDescription"
                  Value="Invoice"
                  className="bg-white"
                />

                <input
                  type="hidden"
                  name="CustomerMobileNumber"
                  Value={UserCredentials.loginId}
                  className="bg-white"
                />

                <input
                  type="hidden"
                  name="CustomerEmail"
                  Value={UserCredentials.employeeEmail}
                  className="bg-white"
                />
                <input
                  type="hidden"
                  name="SuccessUrl"
                  Value="http://localhost:3000/dashboard"
                />
                <input
                  type="hidden"
                  name="FailureUrl"
                  Value="http://localhost:3000/dashboard"
                />
                <input type="hidden" name="OrderDate" Value={OrderDate} />
                <input
                  type="hidden"
                  name="CheckoutUrl"
                  Value="http://localhost:3000/dashboard"
                />
                <input
                  type="hidden"
                  name="Token"
                  Value={FunAuthToken.auth_token}
                />

                <input
                  type="hidden"
                  name="GrossAmount"
                  Value="10000"
                  className="bg-white"
                />

                <input
                  type="hidden"
                  name="TaxAdmount"
                  Value="2.5"
                  className="bg-white"
                />

                <input
                  type="hidden"
                  name="Amount"
                  Value={netAmount}
                  className="bg-white"
                />
                <input type="hidden" name="Discount" Value="1" />
                <input type="hidden" name="PaymentMethod" Value="0" />
                <input
                  type="hidden"
                  name="Signature"
                  value={CryptoJS.MD5(
                    "01234" +
                    OrderId +
                    netAmount +
                    "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI="
                  ).toString(CryptoJS.enc.Hex)}
                />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "end", gap: "20px" }}>
                  <div style={{ cursor: "pointer" }}>
                    Pay Bill through Online Banking app[How?]
                  </div>
                  or
                  <div>
                    <input type="submit" value="Card Payment" />
                  </div>
                </div>
              </form>
            </>
          ) : (
            <></>
          )}

          {/* =========================> Second TABS Content */}
          {/* <div
            class="tab-pane fade d-flex justify-content-center"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="card col-4 mt-5 mx-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">
                  Lorem, ipsum dolor sit amet consectetur elit.
                </h5>
                <p class="card-text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ma.
                </p>
              </div>
            </div>
          </div> */}

          {/* =========================> Third TABS Content */}
          <div
            class="tab-pane fade"
            id="pills-jazzcash"
            role="tabpanel"
            aria-labelledby="pills-jazzcash-tab"
          >
            <div >
              <div class="row d-flex justify-content-center">
                <div class="col-sm-6">
                  <div class="card mx-auto" id="backColor">
                    <p class="heading">PAYMENT DETAILS</p>
                    <form class="card-details ">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/en/b/b4/JazzCash_logo.png"
                        width="64px"
                        height="60px"
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          // marginRight:"auto",
                          marginTop: "-10%",
                        }}
                      />
                      <div class="form-group mb-0">
                        <p class="text-warning mb-0">Mobile Number</p>
                        <input
                          type="text"
                          name="card-num"
                          placeholder="+923022639133"
                          size="17"
                          minlength="13"
                          maxlength="13"
                          ref={JazzMobiNum}
                        />
                      </div>

                      <div class="form-group">
                        <p class="text-warning mb-0">CNIC (Last 6 digits)</p>
                        <input
                          type="text"
                          name="name"
                          placeholder="CNIC (Last 6 digits)"
                          size="6"
                          minlength="6"
                          maxlength="6"
                          ref={JazzCNIC}
                        />
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary mt-4"
                        onClick={JazzCashHandler}
                      >
                        <i class="fas fa-arrow-right px-3 py-2"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}





/*


 <p class="ps-3 textmuted fw-bold h4 mb-0 text-center">
            Choose Payment Mode
          </p>
          <br />
          <ul
            class="nav nav-pills mb-3 justify-content-center"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Credit or Debit Card
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                QR-Code
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="pills-jazzcash-tab"
                data-toggle="pill"
                href="#pills-jazzcash"
                role="tab"
                aria-controls="pills-jazzcash"
                aria-selected="false"
              >
                JazzCash
              </a>
            </li>
          </ul>

          */

