import { useEffect } from "react"
import { useState } from "react"
import OrderDetailService from "../../service/OrderDetailService"
import GetProduct from "./GetProduct";

export default function GetDetails({order_id}) {
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

    let order_details = state.details.filter((detail) => detail.order_id === order_id)
    let order_total = 0;
    return(
        <>
        {
            order_details.map((detail)=>{
                let total = detail.price_charged * detail.quantity;
                order_total += total;
                return(
                    <>
                        ${detail.price_charged} x {detail.quantity} x <GetProduct product_id={detail.product_id}/> = ${total}
                        <br/>
                    </>
               ) 
            })
        }
        SUBTOTAL: ${order_total}<br/>
        TAX: ${Math.round(order_total * 0.07 * 100)/100}<br/>
        <b>TOTAL: ${Math.round(order_total * 1.07 * 100)/100}</b>
        </>
    )
}