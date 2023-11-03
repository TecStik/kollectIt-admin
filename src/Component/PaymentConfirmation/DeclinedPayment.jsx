import React, { useContext, useRef } from 'react';
import './DeclinedPayment.css';
import axios from 'axios';
import { Url } from '../../Pages/Core';
import StoreContext from '../../ContextApi';
import iconCross from './cross.png';


export default function DeclinedPayment() {


  const ClientId = useRef()
  const ClientName = useRef()
  const ClientEmail = useRef()
  const ClientPhoneNumber = useRef()
  const ClientAmount = useRef()

  const RoleDetails = useContext(StoreContext);
  let UserDetail = RoleDetails.UserData
  console.log(UserDetail);

  const FormSubmit = () => {

    // console.log(ClientId.current.value, ClientName.current.value, ClientEmail.current.value, ClientPhoneNumber.current.value, ClientAmount.current.value, 'This is a success message');
    axios({
      method: 'post',
      url: Url + "/ClientData",
      data: {
        ClientId: ClientId.current.value,
        ClientName: ClientName.current.value,
        ClientEmail: ClientEmail.current.value,
        ClientAmount: ClientAmount.current.value,
        ClientPhoneNumber: ClientPhoneNumber.current.value,
        BelongsTo: UserDetail._id
      }

    }).then(response => {
      console.log(response, "response ")
      alert("data has been submitted!")
      ClientId.current.value = ""
      ClientName.current.value = ""
      ClientEmail.current.value = ""
      ClientAmount.current.value = ""
      ClientPhoneNumber.current.value = ""
    })
      .catch(error => {
        console.log(error, "error")
      })


  };



  return (
    <div>
      {/* Client Form
      <br />
      <br /> */}

      <div className="container col-50" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
        <img className='icon' src={iconCross} alt="" />
        
        <p className='title'>Your Payment Has Been Declined</p>
      </div>
    </div>
  );
}
