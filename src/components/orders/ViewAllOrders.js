import React, {useEffect, useState} from "react";
import CustomerOrderService from "../../service/CustomerOrderService"
import CustomerService from "../../service/CustomerService"
import EmployeeService from "../../service/EmployeeService";
import { Link, useNavigate } from 'react-router-dom'

export default function ViewAllOrders() {
    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    let [customer, setCustState] = useState({
        phone_number : '',
        name : '',
        street_address : '',
        zip_code : ''
    });

    let [employee, setEmpState] = useState({
        employee_id : '',
        name : '',
        employee_role : '',
        employee_status : ''
    });

    useEffect(() => {
        CustomerOrderService.getAllOrders().then((response)=>{
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
    let handleSelect = (order_id) => {
        navigate('/newOrder/viewOrder', {state : {order_id}})
    }

    return(
        <>
        <h3>All Orders</h3>
        {
            ordersState.orders.map((order) => {
                CustomerService.findCustomer(order.customer.phone_number).then((response)=>{
                    setCustState(response.data);
                }, ()=>{});
                EmployeeService.findEmployee(order.employee.employee_id).then((response)=>{
                    setEmpState(response.data);
                }, ()=>{});
                if(order.order_status) {
                    return(
                        <div onClick={()=>{handleSelect(order.order_id)}}>
                            <h4>Order #{order.order_id}</h4>
                            <h4>COMPLETE</h4>
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
                } else {
                    return(
                        <div>
                            <h4>Order #{order.order_id}</h4>
                            <h4>ACTIVE</h4>
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
                }
                
            })
        }
        </>
    );
}