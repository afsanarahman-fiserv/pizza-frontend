import { useEffect } from "react";
import { useState } from "react";
import EmployeeService from "../../service/EmployeeService";

export default function GetEmployee({employee_id}) {
    let [employee, setEmpState] = useState({
        employee_id : '',
        name : '',
        employee_role : '',
        employee_status : ''
    });

    useEffect(()=>{
        EmployeeService.findEmployee(employee_id).then((response)=>{
            setEmpState(response.data);
        }, ()=>{});
    })

    return(
        <>
        <h4>Employee</h4>
        <p>Name: {employee.name}</p>
        <p>ID: {employee.employee_id}</p>
        </>
    )
}