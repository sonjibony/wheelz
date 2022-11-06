import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {

// const service = useLoaderData();
 const {_id,title, price} = useLoaderData();
const {user} = useContext(AuthContext);

const onPlaceOrder = e =>{
    e.preventDefault();
    const form = e.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || 'unregistered';
    const phone= form.phone.value;
    const message= form.message.value;


    const order = {
        service: _id,
        serviceName: title,
        price,
        customer: name,
        email,
        phone,
        message
    }

    fetch('http://localhost:5000/orders',{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('wheelz-token')}`
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.acknowledged){
           alert('order placed successfully') 
           form.reset()
        }
    })
    .catch( error => console.error(error));


}

    return (
        <div>
           <form onSubmit={onPlaceOrder}>
            <h2 className="text-4xl  my-6">You are about to order: {title}</h2>
            <h4 className="text-3xl my-6">Price: {price}</h4>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-6'>

           <input name='firstName' type="text" placeholder="First Name" className="input input-ghost w-full input-bordered" />
           <input name='lastName' type="text" placeholder="Last Name" className="input input-ghost w-full input-bordered" />
           <input name='phone' type="text" placeholder="Phone Number" className="input input-ghost w-full input-bordered" />
           <input name='email' type="text" placeholder="Email" defaultValue={user?.email} className="input input-ghost w-full input-bordered" readOnly />
            </div>
            <textarea name='message' className="textarea textarea-bordered h-24 w-full mb-6" placeholder="Your Message"></textarea>
<input className='btn btn-ghost mb-6' type="submit" value="Place Your Order" />
            </form> 
        </div>
    );
};

export default Checkout;