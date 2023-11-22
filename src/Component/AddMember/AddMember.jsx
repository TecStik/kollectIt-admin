import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import './AddMember.css';
import { Url } from '../../Pages/Core';
import StoreContext from '../../ContextApi';
import Papa from 'papaparse';



export default function AddMember() {

    let [Role, setRole] = useState('')
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const ConatactNumber = useRef();
    const [jsonData, setJsonData] = useState(null);


    const RoleDetails = useContext(StoreContext);
    let UserDetail = RoleDetails.UserData
    console.log(RoleDetails?.UserData?._id)

    // console.log(UserDetail, Role, "UserDetail");
    function employe() {
        axios({
            method: "post",
            url: Url + "/auth/employe",
            data: {
                name: name.current.value,
                loginId: email.current.value,
                password: password.current.value,
                email: ConatactNumber.current.value,
                shortCode: UserDetail.shortCode,
                createdBy: UserDetail._id,
                companyName: UserDetail.companyName,
                Role: Role
            }
        }).then((res) => {
            alert("Member created")
            name.current.value = ""
            email.current.value = ""
            password.current.value = ""
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        Papa.parse(file, {
            complete: (result) => {
                console.log('CSV parsed:', result);
                setJsonData(result.data);
            },
            header: true, // Set to true if your CSV file has a header row
        });
    };
    
    for (let i = 0; i < jsonData?.length; i++) {
        let obj = {
            ClientId: jsonData[i]?.ID,
            ClientName: jsonData[i]?.Name,
            ClientPhoneNumber: jsonData[i]?.Phone,
            ClientEmail: jsonData[i]?.email,
            BelongsTo: RoleDetails?.UserData?._id
        }

        console.log(obj);
    }



    return (
        <div class="container col-50" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
            <form style={{ padding: '5px', margin: "5px", boxShadow: "1px 2px 5px 2px #888888" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    employe()
                }}>

                <div class="p-2">
                    <div style={{ textAlign: "center" }}>
                        <h1>Add a Member</h1>
                        {/* <p>Please fill in this form to create an account.</p> */}
                    </div>
                    <hr />
                    <div>
                        <label for="psw-repeat">User Name</label>
                        <input type="text" placeholder="User name of team member" name="name" ref={name} required />
                    </div>
                    <div>
                        <label for="loginId">Number or Login ID</label>
                        <input type="number" placeholder="Number or Login ID" name="email" ref={email} required style={{ padding: '20px 5px' }} />
                    </div>
                    <div>
                        <label for="email">Secondary Contact</label>
                        <input type="email" placeholder="Enter Email" name="number" ref={ConatactNumber} required style={{ padding: '20px 5px' }} />
                    </div>

                    <label for="psw">Password</label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={password} required />

                    <label for="role">Choose a Role:</label>
                    <select name="role" id="role" onChange={(e) => { setRole(e.target.value) }} required>
                        <option value="Rider">Select Role</option>
                        <option value="Rider">Rider</option>
                        <option value="Cashier">Cashier</option>
                    </select>

                    <hr />
                    <button type="submit" class="registerbtn" style={{ backgroundColor: "#427D8F" }}>Register</button>
                </div>
            </form>
            <div className='text-center' style={{ marginTop: "30px" }}>

                <input type="file" onChange={handleFileUpload} className='form-control' />
            </div>
        </div>
    )
}
