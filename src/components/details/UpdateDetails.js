import { useState, useEffect } from "react";
import OrderDetailService from "../../service/OrderDetailService";
import GetProduct from "../orders/GetProduct";
import { useNavigate } from "react-router-dom";

export default function UpdateDetails({order_id}) {
    let [state, setDetails] = useState({
        details : []
    })

    useEffect(() => {
        OrderDetailService.getAllOrderDetails().then((response)=>{
            setDetails(()=>({
                details : response.data
            }));
        }, ()=>{});
    }, []);

    let order_details = state.details.filter((detail) => detail.order_id === order_id);

    let navigate = useNavigate();
    let removeDetail = (detail_id) => {
        navigate("/viewOrders/editOrder/deleteDetail", {state : {detail_id}});
    }

    let updateTotals = () => {
        for(let i = 0; i < order_details.length; i++) {
            let quantity = document.getElementById(i).value;
            if(quantity) {
                let new_total = quantity * order_details[i].price_charged;
                let total_id = "total" + i;
                document.getElementById(total_id).innerHTML = "$" + new_total;
            }
        }
    }
    
    let viewReceipt = () => {
        let receipt = "";
        let order_total = 0;
        for(let i = 0; i < order_details.length; i++) {
            let val = document.getElementById(i).value;
            if(!val) {
                val = order_details[i].quantity;
            }
            let total = val * order_details[i].price_charged;
            order_total += total;
            let product = document.getElementById(("prod" + i)).innerHTML;
            let detail =  "$" + total + " :     $" + order_details[i].price_charged + " x " + val + " x \"" + product + "\"\n";
            receipt += detail;
        }
        let tax = Math.round(order_total * 0.07 * 100) / 100;
        receipt += "\nSUBTOTAL: $" + order_total;
        receipt += "\n          TAX: $" + tax;
        receipt += "\n      TOTAL: $" + (Math.round((order_total + tax)*100)/100);
        alert(receipt);
    }

    let handleSubmit = () => {
        for(let i = 0; i < order_details.length; i++) {
            let val = document.getElementById(i).value;
            if(val) {
                order_details[i].quantity = val;
                OrderDetailService.updateOrderDetail(order_details[i]);
            }
        }
        alert("Order updated!");
        viewReceipt();
        navigate("/viewActiveOrders");
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>
                        <button>
                            Update Totals
                        </button>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    order_details.map((detail, i) => {
                        let product_id = "prod" + i;
                        let total_id = "total" + i;
                        let total = detail.price_charged * detail.quantity;
                        return(
                            <tr>
                                <td>{detail.product_id}</td>
                                <td id={product_id}><GetProduct product_id={detail.product_id}/></td>
                                <td>${detail.price_charged}</td>
                                <td>
                                    <input type="number" min="1" placeholder={detail.quantity} id={i}/>
                                </td>
                                <td id={total_id}>${total}</td>
                                <td>
                                    <button onClick={()=>{removeDetail(detail.detail_id)}}>Remove</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <input type="submit" value="Update Order"/>
        </form>
        </>
    )
}