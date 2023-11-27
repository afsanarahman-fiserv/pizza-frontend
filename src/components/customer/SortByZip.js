import { useState, useEffect } from "react";
import CustomerOrderService from "../../service/CustomerOrderService";
import { Link, useNavigate } from "react-router-dom";

export default function SortByZip() {
    let [ordersState, setOrdersState] = useState({
        orders: []
    });

    useEffect(() => {
        CustomerOrderService.getAllOrders().then((response)=>{
            setOrdersState(()=>({
                orders : response.data
            }));
        }, ()=>{});
    }, []);

    let zips = new Set();
    for(let i = 0; i < ordersState.orders.length; i++) {
        zips.add(ordersState.orders[i].customer.zip_code);
    }
    const zips_list = Array.from(zips)

    let navigate = useNavigate();
    let goToZip = (zip_code) => {
        navigate("/viewAllOrders/byZip/selected", {state : {zip_code}})
    }

    return(
        <div className ="App">
            <h3>Select Zip Code</h3>
        {
            zips_list.map((zip) => {
                return(
                    <header className="App-header4">
                        <br/>
                        <button onClick={()=>{goToZip(zip)}}>{zip}</button>
                    </header>
                )
            })
        }
        <header className="App-header4">
        <Link className="edit-link3" to="/viewAllOrders">
            <button>Back to All Orders</button>
        </Link>
        </header>
        </div>
    )
}