import { useItems } from '@/context/ItemsContext'
import React from 'react'

const Goals = () => {

    const { items } = useItems();
    
    if(!items){
        console.error("no user found")
    }else{
        console.log("user found", items);
        
    }
    

    return (
        <div>{items.map((item,idx) => (
            <h1>{item?.itemName}</h1>
        ))}</div>
    )
}

export default Goals