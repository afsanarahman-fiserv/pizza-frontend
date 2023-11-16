import React from "react";
import { useState } from "react";
import EmployeeService from "../service/EmployeeService";

export default function AddEmployee() {
    let [name, setName] = useState('');
    let [employee_role, setRole] = useState('');
    let [employee_status, setStatus] = useState('');

    let handleName = (e) => { setName(e.target.value) }
    let handleRole = (e) => { setRole(e.target.value) }
    let handleStatus = (e) => { setStatus(e.target.value) }

    let handleSubmit = (e) => {
        e.preventDefault();
        let employee = {name : name, employee_role : employee_role, employee_status : employee_status}
        EmployeeService.addEmployee(employee).then(()=>{
            alert("Employee added successfully")
        }, ()=>{
            alert("Employee creation failed")
        });
    }

    return(
        <>
        <h3>Adding New Employee</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Name: <input onChange={handleName} type="text" value={name}/>
            </label>
            <br/>
            <label>
                Role: <input onChange={handleRole} type="text" value={employee_role}/>
            </label>
            <br/>
            <label>
                Status: <input onChange={handleStatus} type="text" value={employee_status}/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
        </form>
        </>
    );
}