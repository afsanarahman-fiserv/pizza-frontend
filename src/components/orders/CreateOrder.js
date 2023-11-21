import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

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
        let detail = {order_id : order_id, product_id : product.product_id, price_charged : product.price, quantity : 0}
    })

    let handleSubmit = (e) => {
        e.preventDefault();
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
                    state.products.map((product) => {
                        return(
                            <tr>
                                <td>{product.product_id}</td>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td>{product.price}</td>
                                <td>
                                    <label>
                                        <input type="number" min="0" placeholder='0' ></input>
                                    </label>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <input type="submit" value="Submit Order"></input>
        </form>
        <Link to="/newOrder/addOrder">
            <p>Back to Employee Selection</p>
        </Link>
        </>
    )
}