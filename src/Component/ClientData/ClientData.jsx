import React, { useEffect, useState, useContext, useRef } from "react";
import StoreContext from "../../ContextApi";
import { Url } from "../../Pages/Core";
import { CSVLink } from "react-csv";
import "./ClientData.css";
import axios from "axios";
import Filter from "../filter/filter";
// import { Pagination } from "@mui/material";
import PaginationComponent from "../Pagination";


// loading import material ui here
import PropTypes from 'prop-types';
import { Typography, CircularProgress, Box } from "@mui/material";




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

const itemsPerPage = 5;



export default function ClientData() {

  //  console.log("checking...",checkdata)

  const [allData, setallData] = useState([]);
  const UserCredentials = useContext(StoreContext);
  const csvLinkEl = useRef(null);
  const [filterItem, setfilterItem] = useState(allData);
  // const [displaytData, setDisplayData] = useState(allData);
  const [OnData, setOnData] = useState("");
  const [realTime, setRealTime] = useState(true);

  // new State loading and pagination here
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const [progress, setProgress] = useState(10);
  const [loading, setLoading] = useState(true);




  // pagination here .

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = filterItem.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );



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
    { label: "ClientId", key: "ClientId" },
    { label: "Name", key: "ClientName" },
    { label: "Number", key: "ClientPhoneNumber" },
    { label: "Email", key: "ClientEmail" },
    { label: "Amount", key: "ClientAmount" },
  ];

  let clientid = useRef();
  let clientname = useRef();
  let clientphonenumber = useRef();
  let clientemail = useRef();

  useEffect(() => {
    if (UserCredentials.UserData.Role === "Admin") {
      axios({
        method: "post",
        url: Url + "/filteredClients",
        data: {
          filter: {
            BelongsTo: UserCredentials?.UserData._id,
          },
        },
      }).then((response) => {

        // Sort the data based on the 'createdOn' field in descending order
        const sortedData = response?.data.sort((a, b) => {
          return new Date(b.createdOn) - new Date(a.createdOn);
        });
        console.log(sortedData)

        setallData(sortedData);
        setfilterItem(sortedData);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      });
    } else {
      axios({
        method: "post",
        url: Url + "/filteredClients",
        data: {
          filter: {
            AssignedBy: UserCredentials?.UserData._id,
          },
        },
      }).then((response) => {

        // Sort the data based on the 'createdOn' field in descending order
        const sortedData = response?.data.sort((a, b) => {
          return new Date(b.createdOn) - new Date(a.createdOn);
        });

        console.log(sortedData)
        setallData(sortedData);
        setfilterItem(sortedData);
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      });
    }
  }, []);



  // console.log(filterItem, "filter Client Data");

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

  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };

  // modal function here update api

  function handler() {
    console.log(clientid.current.value)

    axios({
      method: "put",
      url: Url + "/UpdateFilteredClients",
      data: {
        filter: {
          _id: OnData?._id,
        },
        update: {
          ClientId: clientid.current.value ? clientid.current.value : OnData?.ClientId,
          ClientName: clientname.current.value ? clientname.current.value : OnData?.ClientName,
          ClientPhoneNumber: clientphonenumber.current.value ? clientphonenumber.current.value : OnData?.ClientPhoneNumber,
          ClientEmail: clientemail.current.value ? clientemail.current.value : OnData?.ClientEmail
        },
      },
    })
      .then((res) => {
        console.log(res?.data, "response");
        setRealTime(!realTime);
      })
      .catch((error) => [console.log(error, "error")]);

  }



  // deactivate handler function here

  function DeactivateHandler() {
    console.log(clientid.current.value)

    axios({
      method: "put",
      url: Url + "/UpdateFilteredClients",
      headers: {
        username: "user1",
        password: "test"
      },
      data: {
        filter: {
          _id: OnData?._id,
        },
        update: {
          ClientStatus: "Deactive",
        },
      },
    })
      .then((res) => {
        console.log(res?.data, "Deactivated data here");
        // setRealTime(!realTime);
      })
      .catch((error) => [console.log(error, "error")]);
  }










  const createFilter = (filterParams) => {
    console.log("FilterParams in createFilter", filterItem);
    const { ClientId, ClientName, ClientPhoneNumber, ClientEmail } = filterParams;
    let filtered = allData;
    filtered = (ClientId) ? filtered.filter((item) => item.ClientId === ClientId) : filtered;
    filtered = (ClientName) ? filtered.filter((item) => item.ClientName === ClientName) : filtered;
    filtered = (ClientPhoneNumber) ? filtered.filter((item) => item?.ClientPhoneNumber === ClientPhoneNumber) : filtered
    filtered = (ClientEmail) ? filtered.filter((item) => item?.ClientEmail === ClientEmail) : filtered

    console.log("Filtered item in create filter", filtered);
    setfilterItem(filtered);

    return filtered
  };






  function creatID(e) {
    console.log(e, "Ee");
    // setImagelink(e.imageUrl)
    // setObjId(e._id)
    setOnData(e);
  }

  return (
    <div>
      <CSVLink
        headers={headers}
        filename="Client Data.csv"
        data={allData}
        ref={csvLinkEl}
      />
      <h1 className="text-center">Client List</h1>
      <div className="d-flex flex-row-reverse m-2">
        <div className="m-2">
          <button
            class="btn text-white "
            style={{
              background: "#427D8F",
              fontSize: 15,
              marginTop: "-3%",
              // padding: 10,
            }}
            onClick={downloadReport}
            role="button"
          >
            Export
            <i class="far fa-circle-down mx-2 "></i>
          </button>
        </div>
        <div className="m-2">
          <Filter data={{ allData, createFilter }} />
        </div>
      </div>

      {/* loading here  */}

      {
        loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgressWithLabel value={progress} />
        </div> : <>
          <input
            type="text"
            id="myInput"
            onChange={myFunction}
            placeholder="Search for names.."
            title="Type in a name"
          ></input>
          <div className="overflow-auto" style={{ maxHeight: "110vh" }}>
            <table id="myTable">
              <tr class="header">
                <th style={{ width: 60 }}>Client ID</th>
                <th style={{ width: 60 }}>Name</th>
                <th style={{ width: 60 }}>Number</th>
                <th style={{ width: 60 }}>Email</th>
                <th style={{ width: 60 }}>Amount</th>
                <th style={{ width: 60 }}>Action</th>
              </tr>
              {displayedData?.sort()?.map((v, index) => {
                return (
                  <tr>
                    <td>{v?.ClientId}</td>
                    <td>{v?.ClientName}</td>
                    <td>{v?.ClientPhoneNumber}</td>
                    <td>{v?.ClientEmail}</td>
                    <td>{v?.ClientAmount}</td>
                    <td>
                      <button
                        class="badge badge-primary rounded-pill d-inline"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => creatID(v)}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* modal start here */}

          <div class="modal" id="myModal">
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content" style={{ width: "115%" }}>
                {/* <!-- Modal Header --> */}
                <div class="modal-header">
                  <h1 class="modal-title">View & Update</h1>
                  <button
                    type="button"
                    class="btn btn-danger close"
                    data-dismiss="modal"
                  >
                    X
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div class="modal-body">
                  <table id="myTable">
                    <td className="client__update_container_th">
                      <th style={{ width: '100%' }}>
                        <input ref={clientid} placeholder={`Client ID ${OnData?.ClientId}`} />
                      </th>
                      <th style={{ width: "100%" }}>
                        <input
                          type="text"
                          ref={clientname}
                          placeholder={`Client Name ${OnData?.ClientName}`}
                        />
                      </th>
                      <th style={{ width: "100%" }}>
                        <input
                          type="text"
                          ref={clientphonenumber}
                          placeholder={`Client Phone Number ${OnData?.ClientPhoneNumber}`}
                        />
                      </th>
                      <th style={{ width: "100%" }}>
                        <input
                          type="text"
                          ref={clientemail}
                          placeholder={`Client Email ${OnData?.ClientEmail}`}
                        />
                      </th>
                    </td>
                  </table>
                </div>

                {/* <!-- Modal footer --> */}
                <div class="modal-footer">
                  <button className="btn btn-danger" style={{ position: 'absolute', left: '10px' }} onClick={() => DeactivateHandler()}>testing</button>

                  {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
                  <button
                    id="sumbit"
                    aria-label=""
                    class="btn btn-success close"
                    data-dismiss="modal"
                    onClick={() => handler()}
                  >
                    SUBMIT
                  </button>
                  {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
                  <button type="button" class="btn btn-danger" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* modal end here */}
          <div style={{ marginTop: "30px" }}>
            <PaginationComponent
              allData={filterItem}
              page={page}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      }


    </div>
  );
}
