import React, { useEffect, useState, useContext, useRef } from "react";
import { Url } from "../../Pages/Core";
import axios from "axios";
import AddQuotaList from "./AddQuotaList";
import { CSVLink } from "react-csv";
import PaginationComponent from "../Pagination";
// loading import material ui here
import PropTypes from 'prop-types';
import { Typography, CircularProgress, Box } from "@mui/material";
import AddQuotaFilter from "./AddQuotaFilter";





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






const itemsPerPage = 2;  //pagination limit here

export default function AddQuota() {
  const [allData, setallData] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const csvLinkEl = useRef(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const [filterItem, setfilterItem] = useState([]);

  const [progress, setProgress] = useState(10);
  const [loading, setLoading] = useState(true);


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
    { label: "Admin Name", key: "employeeName" },
    { label: "Email", key: "employeeEmail" },
    { label: "Limit", key: "Limit" },
    { label: "Credit Blance", key: "CreditBalance" },
  ];

  useEffect(() => {
    axios({
      method: "get",
      url: Url + "/auth/AdminEmploye",
    }).then((response) => {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
      // console.log(response.data, "response");
      setallData(response.data);
      setfilterItem(response.data);
    });
  }, []);

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

  // console.log(displayedData)

  const createFilter = (filterParams) => {
    console.log("FilterParams in createFilter", filterParams);
    const { employeeName, employeeEmail } = filterParams;
    let filtered = allData;

    filtered = (employeeName) ? filtered.filter((item) => item.employeeName === employeeName) : filtered;
    filtered = (employeeEmail) ? filtered.filter((item) => item?.employeeEmail === employeeEmail) : filtered




    console.log("Filtered item in create filter", filtered);
    setfilterItem(filtered);

    return filtered
  };



  return (
    <>
      <div class="card card-cascade narrower">
        <div
          class="container mt-3 overflow-auto"
          style={{ maxHeight: "110vh" }}
        >
          <h2>Add Quota</h2>
          <div style={{ display: "flex", alignItems: 'center', justifyContent: "end" }}>
            <div className="m-2">
              <AddQuotaFilter data={{ allData, createFilter }} />
            </div>
            <div>
              <CSVLink
                headers={headers}
                filename="Quota Data.csv"
                data={allData}
                ref={csvLinkEl}
              />
              <div className="d-flex flex-row-reverse m-2">
                <button
                  class="btn text-white"
                  style={{ background: "#427D8F", fontSize: 15 }}
                  onClick={downloadReport}
                  role="button"
                >
                  Export
                  <i class="far fa-circle-down mx-2 "></i>
                </button>
              </div>
            </div>

          </div>

          {
            loading ? <CircularProgressWithLabel value={progress} /> : <>
              <table class="table table-hover">
                <thead class="bg-light">
                  <tr>
                    <th>Admin Name</th>
                    <th>Email</th>
                    {/* <th>Password</th> */}
                    {/* <th>Stutus</th> */}
                    {/* <th>Position</th> */}
                    <th>Limit</th>
                    <th>Balance</th>
                    <th>Add Quota</th>
                    <th>Add Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {filterItem?.map((v) => (
                    <AddQuotaList alldata={v} />
                  ))}
                </tbody>
              </table>
              <div>
                <PaginationComponent page={page} totalPages={totalPages} onChange={handlePageChange} />
              </div></>
          }
        </div>
      </div>
    </>
  );
}
