import React, { useState, useEffect, useContext } from "react";
import "./TopUP.css";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";


const SeparateDropDown = ({setBillObject}) => {
  const [data, setData] = useState([]);
  const StoreData = useContext(StoreContext);




  const getDat = async () => {
    axios({
      method: "post",
      url: Url + "/kuickpay/filteredBills",
      data: {
        filter: {
          Bill_status: "U"
        }
      }
    }).then((res) => {
      console.log(res?.data, "get bills");
      setData(res?.data)
    }).catch(err => console.log(err?.message))
  }

  useEffect(() => {
    getDat()
  }, [])


  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedDatas = data.find((elm) => elm?.Bill_Number === selectedValue);
    // setSelectedData(selectedDatas);

    setBillObject(selectedDatas);
    StoreData.setSeparateData(selectedDatas)

  };



  return (
    <div className="d-flex justify-content-end  left__dropdown">
      <select
        name="select"
        id="select"
        onChange={handleChange}
      >
        {data?.map((elm) => (
          <option key={elm?._id} value={elm?.Bill_Number} >
            {elm?.Bill_Number}
          </option>
        ))}
      </select>

      {/* <div >
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
      </div> */}
    </div>
  );
};

export default SeparateDropDown;
