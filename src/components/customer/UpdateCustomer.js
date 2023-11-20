import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerService from "../../service/CustomerService"
import { Link } from 'react-router-dom'

export default function UpdateCustomer(){
    let location  = useLocation();
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
            alert("Failed to find user");
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
        let new_customers = {phone_number : phone_number, name : name, street_address : street_address, zip_code : zip_code}
        CustomerService.updateCustomer(new_customers).then(()=>{
            alert(JSON.stringify(new_customers))
            alert("Customer updated successfully")
        }, ()=>{
            alert(JSON.stringify(new_customers))
            alert("Customer update failed")
        });
    }

    return(
        <>
        <h3>Editing Customer</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Phone Number: <input onChange={handleNumber} type="text" value={phone_number} placeholder={customers.phone_number} />
            </label>
            <br/>
            <label>
                Name: <input onChange={handleName} type="text" value={name} placeholder={customers.name}/>
            </label>
            <br/>
            <label>
                Street Address: <input onChange={handleAddress} type="text" value={street_address} placeholder={customers.street_address}/>
            </label>
            <br/>
            <label>
                Zip Code: <input onChange={handleZip} type="text" value={zip_code} placeholder={customers.zip_code}/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
        <Link to="/newOrder">View All Customers</Link>
        </>
    );
 }