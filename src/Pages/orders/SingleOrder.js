import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SingleOrder = ({ order, handledelete }) => {
    const { _id, title, name, email, phone, description, serviceId } = order;
    const [service, setservice] = useState({});
    useEffect(() => {
        fetch(`https://genius-car-server-lyart-seven.vercel.app/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setservice(data))
    }, [serviceId])
    // console.log(service)
    return (

        <tr>
            <th>
                <label>
                    <button className="btn btn-active btn-link" onClick={() => handledelete(_id)}>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            {
                                service?.img &&
                                <img src={service.img} alt="Avatar Tailwind CSS Component" />
                            }

                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{title}</div>
                        <div className="text-sm opacity-50">{description}</div>
                    </div>
                </div>
            </td>
            <td>
                {name}
                <br />
                <span className="badge badge-ghost badge-sm">{phone}</span>
            </td>
            <td>Purple</td>
            <th>
                <Link to={`/update/${_id}`}><button className="btn btn-ghost btn-xs">update</button></Link>
            </th>
        </tr>

    );
};

export default SingleOrder;