import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OrderDetailService from '../../service/OrderDetailService';
import ProductService from '../../service/ProductService';
import { Table } from "react-bootstrap"; 

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

    let viewReceipt = () => {
        let products_ref = state.products;
        let receipt = "";
        let order_total = 0;
        for(let i = 0; i < details.length; i++) {
            let val = document.getElementById(i).value;
            let price_id = "price" + i;
            let price = document.getElementById(price_id).innerHTML.substring(1);
            if(val != 0) {
                let total = val * price;
                order_total += total;
                let detail =  "$" + total + " :     $" + price + " x " + val + " x \""+ products_ref[i].name + " - " + products_ref[i].size + "\"\n";
                receipt += detail;
            }
        }
        let tax = Math.round(order_total * 0.07 * 100) / 100;
        receipt += "\nSUBTOTAL: $" + order_total;
        receipt += "\n          TAX: $" + tax;
        receipt += "\n      TOTAL: $" + (Math.round((order_total + tax)*100)/100);
        alert(receipt);
    }

    let navigate = useNavigate();
    let handleSubmit = (e) => {
        e.preventDefault();
        for(let i = 0; i < details.length; i++) {
            let val = document.getElementById(i).value;
            let price_id = "price" + i;
            let price = document.getElementById(price_id).innerHTML.substring(1);
            if(val != 0) {
                details[i].quantity = val;
                details[i].price_charged = price;
                OrderDetailService.addOrderDetail(details[i]);
            }
        }
        alert("Order submitted!");
        navigate("/viewActiveOrders");
    }

    let handleDiscount = (e) => {
        e.preventDefault();
        let new_id = document.getElementById("discount-id").value;
        let new_price = document.getElementById("discount-price").value;

        let price_id = "price" + (new_id-1);
        let price_element = document.getElementById(price_id);
        price_element.innerHTML = "$" + new_price;

        alert("Discount applied!"); 
    }

    let cancelOrder = () => {
        navigate("/")
    }

    return(
        <div className ="App">
            <h3>Order Details</h3>
        <form onSubmit={handleSubmit}>
        <header className="App-header3">
        <div className= "table-wrapper">
        <Table striped bordered hover>
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
                                <td id={price_id}>${product.price}</td>
                                <td>
                                    <input type="number" min="0" placeholder='0' id={i}/>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>
        </header> 
        <header className="App-header3">
        <input type="submit" value="Submit Order"/>
        </header>
        </form>
        <header className="App-header3">
        <button onClick={viewReceipt}>View Receipt</button>
        </header> 
        <header className="App-header4">
        <h4>Discount</h4>
        <form onSubmit={handleDiscount}>
            <label>
                Product ID: <input id="discount-id" type='text'></input>
            </label>
            <br/>
            <label>
                New Price: <input id="discount-price" type='text'></input>
            </label>
            <br/>
        </form> 
        <br/>
        <input type="submit" value="Apply Discount"/>
        <br/>
        <button onClick={cancelOrder}>Cancel Order</button>
        </header>   
        </div>
    )
}