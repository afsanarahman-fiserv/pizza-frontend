import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OrderDetailService from '../../service/OrderDetailService';

export default function CreateOrder() {
    let location  = useLocation();
    let order_id = location.state.num;

    const getAllProductsUrl = "http://localhost:8080/api/getAllProducts";
    let [state, setState] = useState({
        products: []
    });

    useEffect(() => {
        axios.get(getAllProductsUrl).then((response)=>{
            setState(()=>({
                products : response.data
            }));
        }, ()=>{});
    }, []);

    let details = state.products.map((product) => {
        return {order_id : order_id, product_id : product.product_id, price_charged : product.price, quantity : 0}
    })
    
    // let handleChange = (e, i) => {
    //     details[i].quantity = e.target.value;
    // }

    let navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault();
        for(let i = 0; i < details.length; i++) {
            if(details[i].quantity != 0) {
                OrderDetailService.addOrderDetail(details[i]);
            }
        }
        alert("Order submitted!");
        navigate("/viewActiveOrders");
    }

    let [id, setId] = useState('');
    let [price, setPrice] = useState('');
    let handleId = (e) => { setId(e.target.value) }
    let handlePrice = (e) => { setPrice(e.target.value) }
    let handleDiscount = (e) => {
        e.preventDefault();
        details[id-1].price_charged = price;
        alert("Discount applied!"); 
    }

    let cancelOrder = () => {
        navigate("/viewOrders/deleteOrder", {state : {order_id}})
    }

    return(
        <>
        <h3>Order Details</h3>
        <form onSubmit={handleSubmit}>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {
                    state.products.map((product, i) => {
                        return(
                            <tr id={i}>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td>{product.price}</td>
                                <td>
                                    <label>
                                        <input type="number" min="0" placeholder='0'/>
                                    </label>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <input type="submit" value="Submit Order"/>
        </form>
        <br/>
        <form onSubmit={handleDiscount}>
            <label>
                Product ID: <input onChange={handleId} type='text' value={id}></input>
            </label>
            <br/>
            <label>
                New Price: <input onChange={handlePrice} type='text' value={price}></input>
            </label>
            <br/>
            <input type="submit" value="Apply Discount"/>
        </form>
        <br/>
        <button onClick={cancelOrder}>Cancel Order</button>
        <Link to="/newOrder/selectEmployee">
            <p>Back to Employee Selection</p>
        </Link>
        </>
    )
}