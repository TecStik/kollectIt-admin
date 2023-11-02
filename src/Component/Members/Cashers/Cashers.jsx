import axios from "axios";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Url } from "../../../Pages/Core";
import StoreContext from "../../../ContextApi";
import Filter from "../../filter/filter";
import PaginationComponent from "../../Pagination";

const itemsPerPage = 2;  //pagination limit here


export default function Cashers() {
  const [allData, setallData] = useState([]);
  const UserCredentials = useContext(StoreContext);
  const [filterItem, setfilterItem] = useState(allData);
  // console.log(UserCredentials.UserData);
    // new state json pagination
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allData.length / itemsPerPage);
  
  


  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredEmployee",
      data: {
        filter: {
          createdBy: UserCredentials.UserData._id,
          Role: "Cashier",
        },
      },
    }).then((response) => {
      console.log(response.data, "response");
      setallData(response.data);
    });
  }, []);

      // pagination functions here
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = allData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  return (
    <div class="card card-cascade narrower">
      <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
        <h2>Cashiers</h2>
        <div className="d-flex flex-row-reverse m-2">
        <div className="m-2">
          {/* <button
            class="btn text-white "
            style={{
              background: "#427D8F",
              fontSize: 15,
              marginTop: "-3%",
            }}
            onClick={downloadReport}
            role="button"
          >
            Export
            <i class="far fa-circle-down mx-2 "></i>
          </button> */}
        </div>
        <div className="m-2">
          <Filter data={{ allData, setfilterItem }} />
        </div>
      </div>
        <table class="table table-hover">
          <thead class="bg-light">
            <tr>
              <th>Cashier Name</th>
              <th>Login ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Stutus</th>
              <th>Position</th>
              <th>Action/Roles</th>
            </tr>
          </thead>
          <tbody>
            {displayedData?.map((v, i) => {
              return (
                <tr>
                  <td>{v?.employeeName}</td>
                  <td>{v?.loginId}</td>
                  <td>{v?.employeeEmail}</td>
                  <td>{v?.employeePassword}</td>
                  <td>
                    <span class="badge badge-success rounded-pill d-inline">
                      Active
                    </span>
                  </td>
                  <td>Senior</td>
                  <td>
                    <button class="btn btn-warning btn-rounded">
                      {v?.Role}
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* <tr>
              <td>Mary</td>
              <td>mary@example.com</td>
              <td>Moe</td>
              <td>
                <span class="badge badge-primary rounded-pill d-inline"
                >Onboarding</span
                >
              </td>
              <td>Junior</td>
            </tr>
            <tr>
              <td>July</td>
              <td>july@example.com</td>
              <td>Dooley</td>
              <td>
                <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
              </td>
              <td>Senior</td>
            </tr> */}
          </tbody>
        </table>
        <PaginationComponent onChange={handlePageChange} page={page}  totalPages={totalPages}/>
      </div>
    </div>
  );
}
