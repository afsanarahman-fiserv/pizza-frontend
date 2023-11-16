import React, {useEffect, useState} from "react";
import CustomerService from "../../service/CustomerService"
import { Link, useNavigate } from 'react-router-dom'

export default function ViewCustomers() {
    let [state, setState] = useState({
        customers: []
    });

    useEffect(() => {
        CustomerService.getAllCustomers().then((response)=>{
            setState(()=>({
                customers : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
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
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <button>
            <Link to="/newOrder/newCustomer">Add New Customer</Link>
        </button>
        </>
    );
}