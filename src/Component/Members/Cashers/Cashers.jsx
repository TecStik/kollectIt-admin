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
    <div className="card card-cascade narrower">
      <div className="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
        <h2>Cashiers</h2>
        <div className="d-flex flex-row-reverse m-2">
        <div className="m-2">
        </div>
        <div className="m-2">
          <Filter data={{ allData, setfilterItem }} />
        </div>
      </div>
        <table className="table table-hover">
          <thead className="bg-light">
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
                    <span className="badge badge-success rounded-pill d-inline">
                      Active
                    </span>
                  </td>
                  <td>Senior</td>
                  <td>
                    <button className="btn btn-warning btn-rounded">
                      {v?.Role}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationComponent onChange={handlePageChange} page={page}  totalPages={totalPages}/>
      </div>
    </div>
  );
}
