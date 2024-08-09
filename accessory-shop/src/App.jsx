// App.jsx
import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import accessoryData from './accessory.json';
import DataTable from './components/DataTable';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TotalPriceContext } from './components/context';

function App() {
  const quantityRef = useRef();
  const productRef = useRef();
  const searchRef = useRef();
  const [price, setPrice] = useState(0);
  const [selectedItems, setSelectedItems] = useLocalStorage('Selected-Item', []);
  const [filteredItems, setFilteredItems] = useState(selectedItems);
  const [totalPrice, setTotalPrice] = useState(0);

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

    const existingItemIndex = selectedItems.findIndex(item => item.id === productId);
    let updatedItems;

    if (existingItemIndex >= 0) {
        updatedItems = [...selectedItems];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].price * updatedItems[existingItemIndex].quantity;
    } else {
        const total = product.price * quantity;
        const newItem = { ...product, quantity, total };
        updatedItems = [...selectedItems, newItem];
    }

    setSelectedItems(updatedItems);
    setFilteredItems(updatedItems); // Update filtered items as well
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDelete = (id) => {
    const updatedItems = selectedItems.filter(item => item.id !== id);
    setSelectedItems(updatedItems);
    setFilteredItems(updatedItems); // Update filtered items as well
  };

  const handleSearch = () => {
    const searchValue = searchRef.current.value.toLowerCase();
    const filtered = selectedItems.filter(item => item.name.toLowerCase().includes(searchValue));
    setFilteredItems(filtered);
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedItems]); // Update totalPrice whenever selectedItems change

  return (
    <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
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

        <Row className="justify-content-start align-items-center mt-3 mx-5">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              ref={searchRef}
              className="form-control-sm"
            />
          </Col>
          <Col xs="auto">
            <Button variant="outline-secondary" onClick={handleSearch} className="btn-sm">
              Search
            </Button>
          </Col>
        </Row>

        <DataTable data={filteredItems} onDelete={handleDelete} />

        <div>
          <div className=' fw-bolder'>Selected Product Price: {price}</div>
          <div className=' fw-bold'>Total Price: {totalPrice}</div>
        </div>
      </div>
    </TotalPriceContext.Provider>
  );
}

export default App;
