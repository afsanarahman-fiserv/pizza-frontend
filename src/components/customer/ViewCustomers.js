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
        navigate('/newOrder/selectEmployee', {state : {phone_number}})
    }

    let handleUpdate = (phone_number) => {
        navigate('/viewCustomers/updateCustomer', {state : {phone_number}})
    }

    let handleDelete = (phone_number) => {
        navigate('/viewCustomers/deleteCustomer', {state : {phone_number}})
    }

    return(
        <div className ="App">
            <h3>Select a Customer</h3>
        <header className="App-header3">
        <div className= "table-wrapper">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td></td>
                    <th>Phone Number</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Zip Code</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    state.customers.map((customers, i)=>{
                        return (
                            <tr>
                                <td>
                                    <button onClick={()=>{handleSelect(customers.phone_number)}}>Select</button>
                                </td>
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
        </div>
        </header>
        <header className="App-header4">
        <Link className="edit-link2" to="/viewCustomers/newCustomer">
            <button>Add New Customer</button>
        </Link>
        <br/>
        <Link className="edit-link3" to="/">
            <button>Back to Main Menu</button>
        </Link>
        <br/>
        </header>
        </div>
    );
}