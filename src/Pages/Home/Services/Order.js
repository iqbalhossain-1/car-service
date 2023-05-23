import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Order = () => {
    const { _id, title, Price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlesubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstname.value} ${form.lastname.value}`
        const email = user?.email || 'unregister';
        const phone = form.phone.value;
        const description = form.description.value;
        // console.log(name, email, phone, description)
        const order = {
            serviceId: _id,
            Price,
            title,
            name, email, phone, description
        }

        fetch('https://genius-car-server-lyart-seven.vercel.app/orders', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))

    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 mb-5 gap-4' >
                    <input name='firstname' type="text" placeholder="first name" className="input input-bordered input-primary w-full" />
                    <input name='lastname' type="text" placeholder="last name" className="input input-bordered input-primary w-full" />
                    <input name='phone' type="text" placeholder="phone" className="input input-bordered input-primary w-full" />
                    <input name='email' defaultValue={user?.email} type="text" placeholder="email" className="input input-bordered input-primary w-full" />
                </div>
                <textarea name='description' placeholder="write description if you want" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                <div className='text-center'>
                    <input className='btn' type="submit" value="confirm order" />
                </div>
            </form>
        </div>
    );
};

export default Order;