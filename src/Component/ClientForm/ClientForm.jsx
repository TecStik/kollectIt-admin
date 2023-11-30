import React, { useContext, useRef,useState } from 'react';
import './ClientForm.css';
import axios from 'axios';
import { Url } from '../../Pages/Core';
import StoreContext from '../../ContextApi';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';



export default function ClientForm() {
  const ClientId = useRef()
  const ClientName = useRef()
  const ClientEmail = useRef()
  const ClientPhoneNumber = useRef()
  const ClientAmount = useRef();
  const phoneInputRef = useRef(); // New ref for PhoneInput
  const [value, setValue] = useState();

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

      <div class="container col-50" style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
        <form style={{ padding: '5px', margin: "5px", boxShadow: "1px 2px 5px 2px #888888" }}
          onSubmit={(e) => {
            e.preventDefault();
            FormSubmit();
          }}>
          <div style={{ textAlign: "center" }}>
            <h1>Client Form</h1>
            {/* <p>Please fill in this form to create an account.</p> */}
          </div>
          <hr />


          <div class="row p-2">

            <label for="fname">ID</label>
            <input type="text" id="fname" name="firstname" ref={ClientId} placeholder="Client ID.." required />

            <label for="fname">Name</label>
            <input type="text" id="fname" name="firstname" ref={ClientName} placeholder="Client name.." required />
          </div>
          {/* <div class="row"> */}
          {/* </div> */}
          <div class="row p-2">
            <label for="lname">Contact Number</label>
            <PhoneInput
              international
              defaultCountry="PK"
              placeholder="Enter phone number"
              value={value}
              onChange={(val) => setValue(val)}
              ref={ClientPhoneNumber}
            />

            {/* <input type="number" id="lname" name="lastname" ref={ClientPhoneNumber} placeholder="Client Phone Number.." style={{padding:'15px 10px'}} required/> */}
          </div>
          <div class="row p-2">
            <label for="lname">Email</label>
            <input type="email" id="lname" name="lastname" ref={ClientEmail} placeholder="Client Email.." style={{ padding: '15px 10px' }} required />
          </div>
          <div class="row p-2">
            <label for="lname">Amount</label>
            <input type="number" id="lname" name="lastname" ref={ClientAmount} placeholder="Client Amount.." style={{ padding: '15px 10px' }} required />
          </div>
          <br />
          <div class="row p-2">
            <input type="submit" value="Submit" style={{ backgroundColor: "#427D8F" }} />
          </div>
        </form>
      </div>
    </div>
  );
}
