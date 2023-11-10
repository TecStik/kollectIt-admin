import React, { useContext } from 'react';
import logo from "./tecstik.png";
import "./Table.css";
import StoreContext from '../../ContextApi';



const Table = ({ clientName, billObject, netAmnt }) => {
    const StoreData = useContext(StoreContext);
    // console.log(StoreData?.separateData)
    let data = StoreData?.separateData;

    // console.log(data)

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
                            <li>Rs.{netAmnt && netAmnt}</li>
                            <li>Rs.250</li>
                        </ul>
                    </div>
                </div>
                <div className='last__para'>
                    <ul>
                        <li>Gross Amount</li>
                        <li>Rs.1250</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Table
