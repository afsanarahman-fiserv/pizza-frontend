import { useEffect } from "react";
import { useState } from "react";
import CustomerService from "../../service/CustomerService";

export default function GetCustomer({phone_number}) {
    let [customer, setCustState] = useState({
        phone_number : '',
        name : '',
        street_address : '',
        zip_code : ''
    });

    useEffect(()=>{
        CustomerService.findCustomer(phone_number).then((response)=>{
            setCustState(response.data);
        }, ()=>{});
    })

    return(
        <>
        <h4>Customer</h4>
        <p>Name: {customer.name}</p>
        <p>Phone: {customer.phone_number}</p>
        <p>Street Address: {customer.street_address}</p>
        <p>ZIP: {customer.zip_code}</p>
        </>
    )
}