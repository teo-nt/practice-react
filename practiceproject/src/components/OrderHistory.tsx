import { Fragment, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { redirect } from "react-router-dom";
import { OrderReadOnly } from "../Models/Order";
import Order from "./Order";

export default function OrderHistory() {
    const [orders, setOrders] = useState<OrderReadOnly[]>([])

    useEffect(() => {
        async function getOrders() {
            const response = await fetch('https://localhost:7044/api/orders', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                localStorage.removeItem('token')
                return redirect('/')
            }
            const responseOrders = await response.json()
            setOrders(responseOrders)
        }
        getOrders()
    }, [])

    return (
        <>
            <NavBar />
            <div className="w-50 p-3">
                {orders.map(order => (
                    <Fragment key={order.orderId}>
                        <Order orderId={order.orderId} movies={order.movies} orderDate={order.orderDate} />
                        <hr></hr>
                    </Fragment>
                    
                ))}
            </div>
            
        </>    
    )
}

export function loader() {
    const token = localStorage.getItem('token')
    if (!token) {
        return redirect('/')
    }
    return null;
}