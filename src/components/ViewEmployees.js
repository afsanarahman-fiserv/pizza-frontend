import React, {useEffect, useState} from "react";
import EmployeeService from "../service/EmployeeService"
import { Link } from 'react-router-dom'

export default function ViewEmployees() {
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
                                    <button>Edit</button>
                                    <button>Change Status</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <button>
            <Link to="/employeeMenu/addEmployee">Add New Employee</Link>
        </button>
        </>
    );
}