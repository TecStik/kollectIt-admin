import React, { useState, useEffect } from "react";
import "./TopUP.css";
import droData from "./drop.json";

const SeparateDropDown = () => {
  const [dropDown, setDropDown] = useState("");
  const [data, setData] = useState(droData);
  const [selectedData, setSelectedData] = useState(null);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setDropDown(selectedValue);

    const selectedDatas = data.find((elm) => elm.Bill_Number === selectedValue);
    console.log(selectedDatas)
    setSelectedData(selectedDatas);
  };

//   useEffect(() => {
//     setData(droData);
//   }, []);

  return (
    <div className="d-flex justify-content-end left__dropdown">
      <select
        name="select"
        id="select"
        value={dropDown}
        onChange={handleChange}
      >
        {data?.map((elm) => (
          <option key={elm?._id} value={elm}>
            {elm?.Bill_Number}
          </option>
        ))}
      </select>

      <div >
        <p>{selectedData?._id}</p>
        <p>{selectedData?.Aamount_within_dueDate}</p>
        <p>{selectedData?.Amount_after_dueDate}</p>
        <p>{selectedData?.Amount_paid}</p>
        <p>{selectedData?.BankCharges}</p>
        <p>{selectedData?.Bank_Mnemonic}</p>
        <p>{selectedData?.Bill_Number}</p>
        <p>{selectedData?.Bill_status}</p>
        <p>{selectedData?.Billing_month}</p>
        <p>{selectedData?.ClientId}</p>
        <p>{selectedData?.ClientObjectId}</p>
        <p>{selectedData?.Consumer_Detail}</p>
        <p>{selectedData?.Date_paid}</p>
        <p>{selectedData?.Due_date}</p>
        <p>{selectedData?.Trans_Time}</p>
        <p>{selectedData?.salesTax}</p>
        <p>{selectedData?.createdOn}</p>
      </div>
    </div>
  );
};

export default SeparateDropDown;
