import CustomerOrderService from "../../service/CustomerOrderService";
import EmployeeService from "../../service/EmployeeService";
import CustomerService from "../../service/CustomerService";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddOrder() {
    let location  = useLocation();
    let [customer, setCustomer] = useState({
        phone_number : '',
        name : '',
        street_address : '',
        zip_code : ''
    });

    useEffect(() =>{
        CustomerService.findCustomer(location.state.phone_number).then((response)=>{
            setCustomer(response.data);
        }, ()=>{
            alert(location.state.phone_number);
        });
    })

    let [state, setState] = useState({
        employees: []
    });

    useEffect(() => {
        EmployeeService.getAllEmployees().then((response)=>{
            setState(()=>({
                employees : response.data
            }));
        }, ()=>{});
    }, []);

    let navigate = useNavigate();
    let handleSelect = (employee_id) => {
        let order = {phone_number : customer.phone_number, employee_id : employee_id, order_status : false}
        CustomerOrderService.addOrder(order).then(()=>{
            navigate('/newOrder/createOrder');
            // navigate('/newOrder/createOrder', {state : order.order_id})
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
                    state.employees.map((employee, i)=>{
                        return (
                            <tr>
                                <td>
                                    <button onClick={()=>{handleSelect(employee.employee_id)}}>Select</button>
                                </td>
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