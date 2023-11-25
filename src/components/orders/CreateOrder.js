import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OrderDetailService from '../../service/OrderDetailService';
import ProductService from '../../service/ProductService';

export default function CreateOrder() {
    let location  = useLocation();
    let order_id = location.state.num;

    let [state, setState] = useState({
        products: []
    });

    useEffect(() => {
        ProductService.getAllProducts().then((response)=>{
            setState(()=>({
                products : response.data
            }));
        }, ()=>{});
    }, []);

    let details = state.products.map((product) => {
        return {
            order_id : order_id, 
            product_id : product.product_id, 
            price_charged : product.price, 
            quantity : 0
        }
    })

    let viewReceipt = (e) => {
        e.preventDefault();
        let products_ref = state.products;
        let receipt = "";
        let order_total = 0;
        for(let i = 0; i < details.length; i++) {
            let val = document.getElementById(i).value;
            if(val != 0) {
                let total = val * details[i].price_charged;
                order_total += total;
                let detail =  "$" + total + " :     $" + details[i].price_charged + " x " + val + " x \""+ products_ref[i].name + " - " + products_ref[i].size + "\"\n";
                receipt += detail;
            }
        }
        let tax = Math.round(order_total * 0.07 * 100) / 100;
        receipt += "\nSUBTOTAL: $" + order_total;
        receipt += "\n          TAX: $" + tax;
        receipt += "\n      TOTAL: $" + (order_total + tax);
        alert(receipt);
    }

    let navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault();
        for(let i = 0; i < details.length; i++) {
            let val = document.getElementById(i).value;
            if(val != 0) {
                details[i].quantity = val;
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
        let price_id = "price" + (id-1)
        let price_element = document.getElementById(price_id);
        price_element.innerHTML = price;
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
                        let price_id = "price" + i
                        return(
                            <tr>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td id={price_id}>{product.price}</td>
                                <td>
                                    <input type="number" min="0" placeholder='0' id={i}/>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <button onClick={viewReceipt}>View Receipt</button>
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