import React, { useState, useEffect } from 'react';
import carData from '../data/cars.json';
import Button from 'react-bootstrap/Button';
import './Highlightd.css';
import { IoIosAdd } from "react-icons/io";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocalStorage } from 'react-use';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Highlighted = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState({});
  const [selectedItems, setSelectedItems] = useLocalStorage('Highlight-Item', []);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // State for showing delete confirmation modal
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    setCars(selectedItems || []);
    
    const brandLookup = carData.MMList.reduce((acc, brand) => {
      acc[brand.mkID] = brand.Name;
      return acc;
    }, {});
    setBrands(brandLookup);
  }, [selectedItems]);

  const handleAddCar = (car) => {
    const isAlreadyAdded = selectedItems.some(item => item.Cid === car.Cid);
    if (!isAlreadyAdded) {
      const updatedCars = [...selectedItems, car];
      setSelectedItems(updatedCars);
    }
  };

  const handleDeleteCar = (carId) => {
    const updatedCars = selectedItems.filter(car => car.Cid !== carId);
    setSelectedItems(updatedCars); // Update the local storage with the new list
  };

  const handleDeleteAllCars = () => {
    setSelectedItems([]); // Clear all items from local storage
    setShowConfirm(false); // Close the confirmation modal
  };

  const filteredCars = carData.Cars.filter(car => {
    const brandName = brands[car.MkID] || 'Unknown';
    return brandName.toLowerCase().includes(searchQuery.toLowerCase()); // Filter by brand name
  }).sort((a, b) => {
    const isAAdded = selectedItems.some(item => item.Cid === a.Cid);
    const isBAdded = selectedItems.some(item => item.Cid === b.Cid);
    return isAAdded === isBAdded ? 0 : isAAdded ? -1 : 1;
  });

  
  return (
  <>
    <div className='d-flex justify-content-between align-items-center my-4 mx-2 p-2 rounded-5'>
      <Button 
        variant="danger" 
        className='Custom-buttom mx-5 rounded-5 px-3' 
        onClick={() => setShowConfirm(true)} // Show confirmation modal on click
      >
        <RiDeleteBin6Fill /> Delete All
      </Button>
      <Button 
        variant="dark" 
        onClick={() => setShow(true)} 
        className='Custom-buttom mx-5 rounded-5 px-3'
      >
        <IoIosAdd /> Select cars
      </Button>
    </div>

    {cars.length > 0 ? (
      <Row xs={1} md={5} className="g-5 mx-5 my-1">
        {cars.map(car => (
          <Col key={car.Cid}>
            <Card className="card-custom">
              <Card.Img className="card-img-custom" variant="top" src={car.Img600} />
              <Card.Body>
                <Card.Title>{car.NameMMT}</Card.Title>
                <Card.Text>
                  <div className="d-flex justify-content-between">
                    <span>ราคา: {car.Prc} บาท</span>
                    <span>{brands[car.MkID]}</span>
                  </div>
                  <Button 
                    variant="danger" 
                    className='w-100 my-1' 
                    onClick={() => handleDeleteCar(car.Cid)}
                  >
                    Delete
                  </Button>{' '}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    ) : (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
        <h3 className="text-muted">No Highlighted Cars Available !!</h3>
      </div>
    )}

    <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="custom-modal-styling-title">
          Select cars
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='my-2'>
          <Form.Control
            placeholder="Search cars by brand"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-secondary"><FaSearch /></Button>
        </InputGroup>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className='text-center'>IMG</th>
                <th>Brand</th>
                <th>Model</th>
                <th>PageViews</th>
                <th>Name</th>
                <th>Price</th>
                <th className='text-center'>ADD</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => {
                const isAlreadyAdded = selectedItems.some(item => item.Cid === car.Cid);
                return (
                  <tr key={car.Cid}>
                    <td className='text-center'><img src={car.Img100} alt="" /></td>
                    <td>{brands[car.MkID] || 'Unknown'}</td>
                    <td>{car.Model}</td>
                    <td>{car.PageViews}</td>
                    <td>{car.NameMMT}</td>
                    <td>{car.Prc + " " + car.Currency}</td>
                    <td className='text-center'>
                      <Button 
                        variant={isAlreadyAdded ? "danger" : "success"} 
                        onClick={() => handleAddCar(car)} 
                        disabled={isAlreadyAdded}
                      >
                        {isAlreadyAdded ? "Already" : "ADD"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>

    {/* Delete All Confirmation Modal */}
    <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete All</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete all selected cars? This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirm(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteAllCars}>
          Delete All
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

export default Highlighted;
