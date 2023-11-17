import React, {useEffect, useState} from "react";
import CustomerOrderService from "../../service/CustomerOrderService"
import { Link, useNavigate } from 'react-router-dom'

export default function ViewAllOrders() {
    let [state, setState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getAllCustomers().then((response)=>{
            setState(()=>({
                customers : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
    let handleSelect = (phone_number) => {
        navigate('/newOrder/addOrder', {state : {phone_number}})
    }

    let handleUpdate = (phone_number) => {
        navigate('/newOrder/updateCustomer', {state : {phone_number}})
    }

    let handleDelete = (phone_number) => {
        navigate('/newOrder', {state : {phone_number}})
    }

    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>Phone Number</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Zip Code</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.customers.map((customers, i)=>{
                        return (
                            <tr>
                                <td>{customers.phone_number}</td>
                                <td>{customers.name}</td>
                                <td>{customers.street_address}</td>
                                <td>{customers.zip_code}</td>
                                <td>
                                    <button onClick={()=>{handleUpdate(customers.phone_number)}}>Edit</button>
                                    <button onClick={()=>{handleDelete(customers.phone_number)}}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={()=>{handleSelect(customers.phone_number)}}></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <button>
            <Link to="/newOrder/newCustomer">Add New Customer</Link>
        </button>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        </>
    );
}