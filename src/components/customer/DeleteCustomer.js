import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import CustomerService from "../../service/CustomerService"

export default function DeleteCustomer(){
    let location  = useLocation();
    let navigate = useNavigate();

    useEffect(() =>{
        CustomerService.deleteCustomer(location.state.phone_number).then(()=>{
            alert("Customer deleted")
            navigate({pathname : "/viewCustomers"})
        }, ()=>{
            
        });
    })
    

}