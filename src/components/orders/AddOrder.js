import CustomerOrderService from "../../service/CustomerOrderService";
import { useLocation, useNavigate } from "react-router-dom";
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
        CustomerOrderService.findCustomer(location.state.phone_number).then((response)=>{
            setCustomer(response.data);
        }, ()=>{
            // alert("Failed to find user");
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
        let order = {phone_number : customer.phone_number, employee_id : employee_id, order_status : 'INCOMPLETE'}
        CustomerOrderService.addOrder(order).then(()=>{
            navigate()
        }, ()=>{

        })
    }

    return(
        <>
        <table>
            <thead>
                <tr>
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
                                <td>{employee.employee_id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.employee_role}</td>
                                <td>{employee.employee_status}</td>
                                <td>
                                    <button onClick={()=>{handleSelect(employee.employee_id)}}>Select</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
}