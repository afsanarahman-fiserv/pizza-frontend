import CustomerOrderService from "../../service/CustomerOrderService";
import EmployeeService from "../../service/EmployeeService";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddOrder() {
    let location  = useLocation();
    let customer = location.state.phone_number;

    let [empState, setState] = useState({
        employees: []
    });
    useEffect(() => {
        EmployeeService.getAllEmployees().then((response)=>{
            setState(()=>({
                employees : response.data
            }));
        }, ()=>{});
    }, []);

    let [orderState, setOrderState] = useState({
        orders : []
    });
    useEffect(() => {
        CustomerOrderService.getAllOrders().then((response)=>{
            setOrderState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);
    let num = orderState.orders.length + 1;

    let navigate = useNavigate();
    let handleSelect = (employee_id) => {
        let order = {phone_number : customer, employee_id : employee_id, order_status : false}
        CustomerOrderService.addOrder(order).then(()=>{
            navigate('/newOrder/createOrder', {state : num})
        }, ()=>{
            alert("here");
            navigate('/newOrder/createOrder');
        })
    }

    return(
        <>
        <h3>Employee for Order</h3>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    empState.employees.map((employee, i)=>{
                        return (
                            <tr onClick={()=>{handleSelect(employee.employee_id)}}>
                                
                                <td>{employee.employee_id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.employee_role}</td>
                                <td>{employee.employee_status}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <Link to="/newOrder/addOrder">
            <p>Back to Customer List</p>
        </Link>
        </>
    )
}