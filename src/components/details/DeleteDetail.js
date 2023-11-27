import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderDetailService from "../../service/OrderDetailService";

export default function DeleteDetail() {
    let location = useLocation();
    // let [detail, setDetail] = useState({
    //     detail_id : '',
    //     order_id : '',
    //     price_charged : '',
    //     product_id : '',
    //     quantity : ''
    // });

    // useEffect(()=>{
    //     OrderDetailService.findOrderDetail(location.state.detail_id).then((response)=>{
    //         setDetail(response.data);
    //     }, ()=>{});
    // })

    // let order_id = detail.order_id;

    let navigate = useNavigate();
    useEffect(() =>{
        OrderDetailService.deleteOrderDetail(location.state.detail_id).then(()=>{
            alert("Item removed");
            navigate("/viewActiveOrders")
        }, ()=>{});
    })
}