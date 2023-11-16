import React, {useEffect, useState} from "react";
import CustomerService from "../../service/CustomerService"
import { Link } from 'react-router-dom'

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
                                <td>{customers.address}</td>
                                <td>{customers.zip_code}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Update</button>
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