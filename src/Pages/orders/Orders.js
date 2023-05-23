import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SingleOrder from './SingleOrder';

const Orders = () => {
    const { user, logout } = useContext(AuthContext);
    // console.log(user)
    const [orders, setorders] = useState([]);
    useEffect(() => {
        fetch(`https://genius-car-server-lyart-seven.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    return logout()
                }
                return res.json()
            })
            .then(data => {
                setorders(data)
            })
    }, [user?.email, logout])
    // console.log(orders)
    const handledelete = id => {
        const proceed = window.confirm('sure to delete?')
        if (proceed) {
            fetch(`https://genius-car-server-lyart-seven.vercel.app/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {

                        const remaining = orders.filter(order => order._id !== id)
                        setorders(remaining)
                    }

                })
        }
    }
    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length}
                        {
                            orders.map(order => <SingleOrder key={order._id} handledelete={handledelete} order={order}></SingleOrder>)
                        }
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default Orders;