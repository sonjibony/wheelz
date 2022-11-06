import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user,logOut} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    console.log(orders);
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`,{
headers: {
    authorization: `Bearer ${localStorage.getItem('wheelz-token')}`
}
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
             return logOut()
            }
           return res.json()
        })
        .then(data => {
            // console.log('receive',data);
             setOrders(data)
        })
    },[user?.email, logOut])

//delete
const onDelete = id => {
    const proceed = window.confirm('Do you want to cancel this order?');
    
    if(proceed){
      fetch(`http://localhost:5000/orders/${id}`,{
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${localStorage.getItem('wheelz-token')}`
        }
    })
      .then (res => res.json())
      .then(data => {
          // console.log(data);
          if(data.deletedCount > 0){
            alert('deleted successfully');
            const remaining = orders.filter(odr => odr._id !== id)
            setOrders(remaining)
          }
      })
    }
  }

 const onStatusUpdate = id => {
    fetch(`http://localhost:5000/orders/${id}`,{
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('wheelz-token')}`
        },
        body: JSON.stringify({status: 'Approved'})
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const remaining = orders.filter(odr => odr._id !== id);
    const approving = orders.find(odr => odr._id === id);
    approving.status = 'Approved'

    const newOrders = [approving,...remaining ];
    setOrders(newOrders);
  })
 }

    return (
        <div>
            <h2 className='text-5xl'>You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    
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
    {
        orders.map(order => <OrderRow
        key={order._id}
        order={order}
        onDelete={onDelete}
        onStatusUpdate={onStatusUpdate}
        ></OrderRow>)
    }
</tbody>
</table>
</div>


        </div>
    );
};

export default Orders;