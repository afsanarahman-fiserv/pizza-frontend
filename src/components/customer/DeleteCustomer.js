import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import CustomerService from "../../service/CustomerService"
import { Link } from 'react-router-dom'

export default function DeleteCustomer(){
    let location  = useLocation();
    let navigate = useNavigate();

    useEffect(() =>{
        CustomerService.deleteCustomer(location.state.phone_number).then(()=>{
            navigate({pathname : "/newOrder"})
        }, ()=>{
            alert(location.state.phone_number)
        });
    })
    

}