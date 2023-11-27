import { useEffect } from "react";
import { useState } from "react";
import CustomerService from "../../service/CustomerService";

export default function GetCustomer({phone_number}) {
    let [customer, setCustState] = useState({
        name : '',
        phone_number : '',
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
        <h5>Customer</h5>
        Name: {customer.name}<br/>
        Phone: {customer.phone_number}<br/>
        Street Address: {customer.street_address}<br/>
        ZIP: {customer.zip_code}<br/>
        </>
    )
}