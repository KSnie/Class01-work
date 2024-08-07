import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  useEffect(() => {
    // Fetch data from JSON file on component mount
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Merge redundant items on initial load
        const mergedData = data.reduce((acc, item) => {
          const existingItemIndex = acc.findIndex(
            (v) => v.item === item.item && v.ppu === item.ppu
          );

          if (existingItemIndex !== -1) {
            acc[existingItemIndex].qty += item.qty;
            acc[existingItemIndex].discount += item.discount;
          } else {
            acc.push(item);
          }

          return acc;
        }, []);
        setDataItems(mergedData);
      })
      .catch((error) => console.error("Error loading pre-fill data:", error));
  }, []);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseFloat(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value || 0),
    };

    setDataItems((prevDataItems) => {
      const index = prevDataItems.findIndex(
        (v) => v.item === newItem.item && v.ppu === newItem.ppu
      );

      if (index !== -1) {
        // Merge redundant item
        const updatedItems = [...prevDataItems];
        updatedItems[index] = {
          ...updatedItems[index],
          qty: updatedItems[index].qty + newItem.qty,
          discount: updatedItems[index].discount + newItem.discount,
        };
        return updatedItems;
      } else {
        // Add unique item
        return [...prevDataItems, newItem];
      }
    });
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={() => setPpu(ppuRef.current.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
