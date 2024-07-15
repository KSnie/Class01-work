import './Hm_Content.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Hm_Content = () => {
    return (
        <div>
            <h3 className="mt-5 text-center">สินค้ายอดนิยม</h3>

            <Row xs={1} md={5} className="g-5 mx-5 my-1">
                {Array.from({ length: 10 }).map((_, idx) => (
                <Col key={idx}>
                    <Card>
                        <Card.Img variant="top" src="public/Robux.png" />
                        <Card.Body>
                            <Card.Title>Robux (ระบบกลุ่ม)</Card.Title>
                            <Card.Text>
                                <div className ="d-flex justify-content-between">
                                    <span>ราคา: 150 Coin</span>
                                    <span>จำนวนขาย: 100</span>
                                </div>
                            </Card.Text>
                            <Card.Text>
                                หมายเหตุ: เติมระบบกลุ่มต้องเข้ากลุ่ม 14 วัน ถึงจะทำการเติมได้
                            </Card.Text>

                            <Button variant="outline-success" className='w-100 p-2 rounded-3'>นำใส่ตะกล้า</Button>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
    )
}

export default Hm_Content