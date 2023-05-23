import React from 'react';
import AuthProvider, { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const { _id, name, phone, email, description } = useLoaderData();
    console.log(name)
    const { user } = AuthProvider(AuthContext);
    const handlesubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const upname = form.name.value;
        const upemail = form.email.value;
        const upphone = form.phone.value;
        const updescription = form.description.value;
        const updateinfo = {
            name: upname,
            email: upemail,
            phone: upphone,
            description: updescription
        }

        fetch(`https://genius-car-server-lyart-seven.vercel.app/update/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateinfo)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 mb-5 gap-4' >
                    <input defaultValue={name} name='name' type="text" placeholder="name" className="input input-bordered input-primary w-full" />

                    <input name='phone' defaultValue={phone} type="text" placeholder="phone" className="input input-bordered input-primary w-full" />
                    <input name='email' defaultValue={email} type="text" placeholder="email" className="input input-bordered input-primary w-full" />
                </div>
                <textarea defaultValue={description} name='description' placeholder="write description if you want" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                <div className='text-center'>
                    <input className='btn' type="submit" value="update order" />
                </div>
            </form>
        </div>
    );
};

export default Update;