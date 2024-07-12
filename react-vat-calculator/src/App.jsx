import { useState } from 'react'
import './App.css'

function App() {
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  
  return (
    <>
      <div className='container'>
        <h1> Vat Calculator </h1>
        <div className='vat-calculator'>

          <div className='input-session'>
            <h3>Price</h3>
            <input placeholder='Enter Your Price' onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <br />
          <div className='input-session'>
            <h3>Discount</h3>
            <input placeholder='Enter Your Discount' onChange={(e) => setDiscount(e.target.value)}/>
          </div>
          <br />
          <br />
          <div className='Summary'>
            <h4>Gross price</h4>
            <h5>{price - discount}</h5>
          </div>

          <div className='Summary'>
            <h4>VAT</h4>
            <h5>{((price - discount) * 0.07).toFixed(2)}</h5>
          </div>

          <div className='Summary'>
            <h4>Total</h4>
            <h5>{(price - discount) - ((price - discount) * 0.07).toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
