import { useState, useRef } from 'react';
import accessoryData from './accessory.json';
import DataTable from './components/DataTable';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const quantityRef = useRef();
  const productRef = useRef();
  const [price, setPrice] = useState(0);
  
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: "Mouse", price: 10, quantity: 2 ,total: 20},
    { id: 2, name: "Keyboard", price: 20, quantity: 1 ,total: 20},
  ]);

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    setPrice(product ? product.price : 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = parseInt(productRef.current.value);
    const product = accessoryData.find(accessory => accessory.id === productId);
    let quantity = parseInt(quantityRef.current.value);

    if (quantity <= 0) {
      quantity = 1;
    }

    let total = product.price * quantity;

    const order = {
      ...product,
      quantity,
      total
    };
    setSelectedItems(prevItems => [...prevItems, order]);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!Array.isArray(accessoryData)) {
    console.error('accessoryData is not an array');
    return <div>Error: Data not available</div>;
  }

  return (
    <div className="text-center">
      <FloatingLabel controlId="floatingSelect" label="Select Product" className=' mt-5 mx-5'>
        <Form.Select aria-label="Floating label select example" ref={productRef} onChange={updatePrice}>
          {accessoryData.map((accessory, index) => (
            <option key={index} value={accessory.id}>{accessory.name}</option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingNumber" label="Quantity" className='mt-3 mx-5'>
        <Form.Control type="number" placeholder="Quantity" ref={quantityRef} defaultValue={1} />
      </FloatingLabel>

      <Button variant="outline-primary" onClick={handleSubmit} className='mt-3 w-25'>Submit</Button>{' '}

      <DataTable data={selectedItems} />

      <div>
        <div className=' fw-bolder'>Selected Product Price: {price}</div>
        <div className=' fw-bold'>Total Price: {calculateTotalPrice()}</div>
      </div>   
    </div>
  );
}

export default App;
