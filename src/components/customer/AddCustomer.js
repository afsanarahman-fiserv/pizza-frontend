import {React, useState} from "react";
import CustomerService from "../../service/CustomerService"
import { Link, useNavigate } from 'react-router-dom'

export default function AddCustomers() {
    let [phone_number, setPhone_Number] = useState('');
    let [name, setName] = useState('');
    let [street_address, setAddress] = useState('');
    let [zip_code, setZip_Code] = useState('');

    let handleNumber = (e) => { setPhone_Number(e.target.value) }
    let handleName = (e) => { setName(e.target.value) }
    let handleAddress = (e) => { setAddress(e.target.value) }
    let handleZip = (e) => { setZip_Code(e.target.value) }

    let navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault();
        let customer = {phone_number : phone_number, name : name, street_address : street_address, zip_code : zip_code};
        CustomerService.addCustomer(customer).then(()=>{
            alert("New customer added");
            navigate("/viewCustomers");
        }, ()=>{
            alert("Customer creation failed");
        });
    }

    return(
        <>
        <h3>Adding New Customer</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Phone Number: <input onChange={handleNumber} type="text" value={phone_number}/>
            </label>
            <br/>
            <label>
                Name: <input onChange={handleName} type="text" value={name}/>
            </label>
            <br/>
            <label>
                Street Address: <input onChange={handleAddress} type="text" value={street_address}/>
            </label>
            <br/>
            <label>
                Zip Code: <input onChange={handleZip} type="text" value={zip_code}/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
        <Link to="/viewCustomers">View All Customers</Link>
        </>
    );
}