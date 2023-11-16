import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerService from "../../service/CustomerService"
import { Link } from 'react-router-dom'
export default function UpdateCustomer(){
    let location  = useLocation();
    let index = location.state.phone_number

    let [customers, setCustomer] = useState({
        phone_number : '',
        name : '',
        street_address : '',
        zip_code : ''

    });

    useEffect(() =>{
        CustomerService.findCustomer(location.state.phone_number).then((response)=>{
            setCustomer(response.data);
        }, ()=>{
            // alert("Failed to find user");
        });
    })

    let [phone_number, setPhone_Number] = useState('');
    let [name, setName] = useState('');
    let [street_address, setAddress] = useState('');
    let [zip_code, setZip_Code] = useState('');

    let handleNumber = (e) => { setPhone_Number(e.target.value) }
    let handleName = (e) => { setName(e.target.value) }
    let handleAddress = (e) => { setAddress(e.target.value) }
    let handleZip = (e) => { setZip_Code(e.target.value) }

    let handleSubmit = (e) => {
        e.preventDefault();
        let customers = {phone_number : phone_number, name : name, street_address : street_address, zip_code : zip_code}
        CustomerService.UpdateCustomer(customers).then(()=>{
            alert("Customer updated successfully")
        }, ()=>{
            alert("Customer update failed")
        });
    }

    return(
        <>
        <h3>Editiing Customer</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Phone Number: <input onChange={handleNumber} type="text" value={phone_number} disabled/>
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
        <Link to="/newOrder">View All Employees</Link>
        </>
    );
 }