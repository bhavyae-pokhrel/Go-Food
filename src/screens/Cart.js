
import React from 'react'
import { useCart,useDispatchCart } from '../components/ContextReducer';
import trash from "../trash.svg"
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div >
        <div className='m-3 w-100 text-center fs-2'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
  let userEmail = localStorage.getItem("userEmail");
  let response = await fetch("https://gofoodbackend-mqax.onrender.com/api/orderData", {
  // http://localhost:5000       let response = await fetch("https://gofoodapi-i32n.onrender.com/api/orderData", {
      method: 'POST',
       headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

     if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
 }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (   
   
    <div style={{background:"black",height:"100%",overflowY:"auto"}}> 
      <div className='container table-responsive table-responsive-sm table-responsive-md table-responsive-lg'>
        <table className='table'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >No.</th>
              <th scope='col' >Name</th>
              <th scope='col' >Image</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' >Remove</th>
            </tr>
          </thead>
         <tbody>
            {data.map((food, index) => ( 
              <tr className="text-white fs-5">
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td><img src={food.img} style={{height:"40px",width:"80px"}} alt=""/></td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                 <td ><button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={() => {dispatch({type:"REMOVE",index:index }) }} /></button> </td>    
              </tr>
            ))}
          </tbody> 
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn-lg bg-success  text-white' onClick={handleCheckOut}>Check Out</button>    
        </div>
      </div>
    </div>
  )
}