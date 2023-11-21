import React, {useEffect, useState} from "react";
import CustomerService from "../../service/CustomerService"
import { Table } from "react-bootstrap"; 
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
    let handleSelect = (phone_number) => {
        navigate('/newOrder/addOrder', {state : {phone_number}})
    }

    let handleUpdate = (phone_number) => {
        navigate('/newOrder/updateCustomer', {state : {phone_number}})
    }

    let handleDelete = (phone_number) => {
        navigate('/newOrder/deleteCustomer', {state : {phone_number}})
    }

    return(
        <>
        <h3>All Customers</h3>
        <div className= "table-wrapper">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
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
                            <tr onClick={()=>{handleSelect(customers.phone_number)}}>
                                
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
        </Table>
        <button>
            <Link to="/newOrder/newCustomer">Add New Customer</Link>
        </button>
        <Link to="/">
            <p>Back to Main Menu</p>
        </Link>
        </div>
        </>
    );
}