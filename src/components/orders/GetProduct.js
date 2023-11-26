import { useEffect } from "react";
import { useState } from "react";
import ProductService from "../../service/ProductService";

export default function GetProduct({product_id}) {
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

    let target = {};
    for(let i = 0; i < state.products.length; i++) {
        if(state.products[i].product_id == product_id) {
            target = state.products[i];
            break;
        }
    }

    return(
        <>
        "{target.name} - {target.size}"
        </>
    )
}