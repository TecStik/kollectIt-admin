import React, { useEffect, useState, useContext, useRef } from "react";
import StoreContext from "../../ContextApi";
import { Url } from "../../Pages/Core";
import { CSVLink } from "react-csv";
import "./PaymentData.css";
import axios from "axios";
import Filter from "../filter/filter";
import moment from "moment";
import PropTypes from 'prop-types';
import { CircularProgress, Box, Typography } from "@mui/material";
// import  pagination Component 
import Pagination from "../Pagination";


const itemsPerPage = 5;  //pagination limit here

// loading function here
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};



export default function PaymentData() {
  const [allData, setallData] = useState([]);
  const [OnData, setOnData] = useState("");
  const [realTime, setRealTime] = useState(true);
  const [ObjId, setObjId] = useState("");
  const [Imagelink, setImagelink] = useState([]);
  const [filterItem, setfilterItem] = useState([]);
  const csvLinkEl = useRef(null);

  // loading state
  const [progress, setProgress] = useState(10);
  const [loading, setLoading] = useState(true);

  // new state json pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);


  // loading useEffect here
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);


  const headers = [
    { label: "Verify.Code", key: "VerificationCode" },
    { label: "Name", key: "PaymentName" },
    { label: "Draw On", key: "drawOn" },
    { label: "Payment Status", key: "PaymentStatus" },
    { label: "Due On", key: "dueOn" },
    { label: "Image", key: "imageUrl" },
    { label: "Staus", key: "status" },
  ];
  const [update, setUpdate] = useState({});
  // const [DownOn, setDownOn] = useState("");

  let drawOnref = useRef();
  let dueOnref = useRef();

  const UserCredentials = useContext(StoreContext);

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/multiFilteredPayments",
      data: {
        filter: {
          BelongsTo: UserCredentials?.UserData?._id,
        },
      },
    }).then((response) => {
      console.log(response?.data, "response");
      setallData(response?.data);
      setfilterItem(response?.data);
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    });
  }, []);




  // useEffect(() => {
  //     axios({
  //         method: "get",
  //         url: Url + "/",
  //     }).then((response) => {
  //         // console.log(response.data,"response")
  //         setallData(response.data.Data)
  //     })
  // }, [realTime])

  function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  function creatID(e) {
    console.log(e, "Ee");
    // setImagelink(e.imageUrl)
    // setObjId(e._id)
    setOnData(e);
  }
  // console.log(OnData.imageUrl, "rrrrr");

  function handler() {
    console.log("In Submit Handler", dueOnref.current.value, drawOnref.current.value);
    let update = {
      drawOn: drawOnref.current.value ? drawOnref.current.value : OnData?.drawOn,
      dueOn: dueOnref.current.value ? dueOnref.current.value : OnData?.dueOn
    }
    console.log("Update Object", update);

    axios({
      method: "put",
      url: Url + "/UpdateFilteredPayments",
      data: {
        filter: {
          _id: OnData?._id,
        },
        update: update,
      },
    })
      .then((res) => {
        console.log(res?.data, "response");
        setRealTime(!realTime);
      })
      .catch((error) => [console.log(error, "error")]);

    //  update to fetch all data here

    setTimeout(() => {
      axios({
        method: "post",
        url: Url + "/multiFilteredPayments",
        data: {
          filter: {
            BelongsTo: UserCredentials?.UserData?._id,
          },
        },
      }).then((response) => {
        console.log(response?.data, "response");
        setallData(response?.data);
        setfilterItem(response?.data);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      });
    }, 100);
  }


  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };


  // pagination functions here
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = allData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // console.log(filterItem, "filter PAyment Data Data");
  // useEffect(()=>{
  //   setallData(filterItem)
  // },[])
  return (
    <div>
      <CSVLink
        headers={headers}
        filename="Payment Data.csv"
        data={allData}
        ref={csvLinkEl}
      />

      <h1 className="text-center">Payment List</h1>

      <div className="d-flex flex-row-reverse m-2">
        <div className="m-2">
          <button
            className="btn text-white "
            style={{
              background: "#427D8F",
              fontSize: 15,
              marginTop: "-3%",
            }}
            onClick={downloadReport}
            role="button"
          >
            Export
            <i className="far fa-circle-down mx-2 "></i>
          </button>
        </div>
        <div className="m-2">
          <Filter data={{ allData, setfilterItem }} />
        </div>
      </div>
      {/* loading here */}

      {loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgressWithLabel value={progress} />
      </div> : <>
        <input
          type="text"
          id="myInput"
          onChange={myFunction}
          placeholder="Search for names.."
          title="Type in a name"
        ></input>
        <div className=" overflow-auto" style={{ maxHeight: "110vh" }}>
          <table id="myTable">
            <tr className="header">
              <th>Verify Code</th>
              <th>Name</th>
              <th>Drawn on</th>
              <th>Payment Status</th>
              <th>Due On</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {!allData?.length ? (
              <>
                <h1 className="text-center">No Data</h1>
              </>
            ) : (
              <>
                {displayedData?.map((v, index) => {
                  // console.log(v.createdOn);
                  return (
                    <tr key={index}>
                      <td className="text-center">{v?.VerificationCode}</td>
                      <td>{v?.PaymentName}</td>
                      <td>{v?.drawOn}</td>
                      <td>{v?.PaymentStatus}</td>
                      <td className="text-center">{v?.dueOn}</td>
                      <td>{moment(v?.createdOn).format("MMM Do YY")}</td>
                      {/* <td>
                      <img src={v.imageUrl} id="tableImage" />
                    </td> */}
                      <td>{v?.status}</td>
                      <td>
                        <td>
                          <button
                            className="badge badge-primary rounded-pill d-inline"
                            data-toggle="modal"
                            data-target="#myModal"
                            onClick={() => creatID(v)}
                          >
                            view
                          </button>
                        </td>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </table>
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content" style={{ width: "115%" }}>
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h1 className="modal-title">View & Update</h1>
                <button
                  type="button"
                  className="btn btn-danger close"
                  data-dismiss="modal"
                >
                  X
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div className="modal-body">
                <table id="myTable">
                  <td>
                    <img
                      src={OnData?.imageUrl}
                      alt="Girl in a jacket"
                      width="500rem"
                      height="300"
                    ></img>
                    <th style={{ width: "40%" }}>
                      <input
                        type="text"
                        ref={drawOnref}
                        placeholder={OnData?.drawOn ? OnData?.drawOn : ""}
                      />
                    </th>
                    <input
                      type="date"
                      ref={dueOnref}
                      // value={value}
                      // onChange={(e) => setValue(e.target.value)}
                      placeholder={OnData?.dueOn ? OnData.dueOn : ""}
                    />

                  </td>
                </table>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="modal-footer">
                {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
                <button
                  id="sumbit"
                  aria-label=""
                  className="btn btn-success close"
                  data-dismiss="modal"
                  onClick={() => handler()}
                >
                  SUBMIT
                </button>
                {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Pagination allData={allData} onChange={handlePageChange} totalPages={totalPages} page={page} />
        </div>
      </>}
    </div>
  );
}
