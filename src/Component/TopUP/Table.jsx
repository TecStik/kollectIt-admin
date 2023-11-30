import React, { useContext } from 'react';
import logo from "./tecstik.png";
import "./Table.css";
import StoreContext from '../../ContextApi';
import {Button} from "react-bootstrap";


const Table = ({ clientName, billObject, netAmnt }) => {
    const StoreData = useContext(StoreContext);
    // console.log(StoreData?.separateData)
    let data = billObject; //StoreData?.separateData;
    const tax= Number( data?.salesTax);

    // console.log(data)

    const handlePrint = () =>{
        window.print();
    }

    return (
        <div>
            <div className='today_box'>
                <img src={logo} alt="logo" className='logo' />
                <p className='para'>A Fintech division of Pacific Financial Services(Pvt.) Limited</p>

                <h5 className='payment'>Payment Invoice</h5>
                <div className='container__invoce'>
                    <div className='first'>
                        <ul>
                            <li>Invoice Number</li>
                            <li>Client</li>
                            <li>Payee</li>
                        </ul>
                    </div>
                    <div className='second'>
                        <ul>
                            <li>{data?.MerchantId ? data?.MerchantId : 0}</li>
                            <li>{clientName && clientName}</li>
                            <li>{data?.MerchantName ? data?.MerchantName : ""}</li>
                            {/* <li>Pacific Financial Services(Pvt.) Limited</li> */}
                        </ul>
                    </div>
                </div>
                {/* container bill */}
                <div className='container_bill'>
                    <ul className='res__container'>
                        <li className='first_ul'>KuickPay Bill Number</li>
                        <li className='second_ul'>{data?.Bill_Number ? data?.Bill_Number : 0}</li>
                    </ul>
                </div>
                <div className='desc___container'>
                    <ul>
                        <li style={{ fontWeight: "bold" }}>Description</li>
                        <li>Advance Payment for utlization of Kollectlt app services</li>
                    </ul>
                </div>
                <div className='amount__div'>
                    <div className='first__amount'>
                        <ul>
                            <li>Net Amount</li>
                            <li>Tax</li>
                        </ul>
                    </div>
                    <div className='second__amount'>
                        <ul>
                            <li>Rs.{data?.Aamount_within_dueDate}</li>
                            <li>Rs.0</li>
                        </ul>
                    </div>
                </div>
                <div className='last__para'>
                    <ul>
                        <li>Gross Amount</li>
                        <li>Rs.{data?.Aamount_within_dueDate}</li>
                    </ul>
                </div>
            </div>

            <div style={{display:'flex',justifyContent:"flex-end",alignItems:"center",position:'relative',right:"180px",margin:'20px 0px'}}>
                <Button onClick={handlePrint}>Print</Button>
            </div>
        </div>
    )
}

export default Table
