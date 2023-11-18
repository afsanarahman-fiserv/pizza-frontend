import React, {useEffect, useState} from "react";
import CustomerOrderService from "../../service/CustomerOrderService"
import CustomerService from "../../service/CustomerService"
import { Link, useNavigate } from 'react-router-dom'

export default function ViewAllOrders() {
    let [state, setState] = useState({
        orders: [],
        customer: [],
        employee : []
    });

    useEffect(() => {
        CustomerOrderService.getAllCustomers().then((response)=>{
            setState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let getCustomerDetails = (phone_number) => {
        CustomerService.findCustomer(phone_number).then((response)=>{
            setState(()=>({
                customer : response.data
            }));
        }, ()=>{});
    }

    let getEmployeeDetails = (employee_id) => {
        EmployeeService.findEmployee(employee_id).then((response)=>{
            setState(()=>({
                employee : response.data
            }));
        }, ()=>{});
    }

    let navigate = useNavigate();
    let handleSelect = (order_id) => {
        navigate('/newOrder/viewOrder', {state : {order_id}})
    }

    // let handleUpdate = (phone_number) => {
    //     navigate('/newOrder/updateCustomer', {state : {phone_number}})
    // }

    // let handleDelete = (phone_number) => {
    //     navigate('/newOrder', {state : {phone_number}})
    // }

    return(
        <>
        <h3>All Orders</h3>
        {
            state.orders.map((order) => {
                customer = getCustomerDetails(order.phone_number);
                employee = getEmployeeDetails(order.employee_id);
                return(
                    <div onClick={handleSelect(order.order_id)}>
                        <h4>Order Details</h4>
                        <h4>Customer</h4>
                        <p>Name: {customer.name}</p>
                        <p>Phone: {customer.phone_number}</p>
                        <p>Street Address: {customer.street_address}</p>
                        <p>ZIP: {customer.zip_code}</p>
                        <h4>Employee</h4>
                        <p>Name: {employee.name}</p>
                        <p>ID: {employee.employee_id}</p>
                    </div>
                )
            })
        }
        </>
    );
}