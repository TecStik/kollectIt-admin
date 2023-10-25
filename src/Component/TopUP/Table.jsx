import React from 'react';
import logo from "./tecstik.png";
import "./Table.css";

const Table = () => {
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
                            <li>0001542</li>
                            <li>Client Name</li>
                            <li>Pacific Financial Services(Pvt.) Limited</li>
                        </ul>
                    </div>
                </div>
                {/* container bill */}
                <div className='container_bill'>
                    <ul className='res__container'>
                        <li className='first_ul'>KuickPay Bill Number</li>
                        <li className='second_ul'>100000001542</li>
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
                            <li>Rs.1000</li>
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
