import './Hm_Header.css'
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

const Hm_Header = () => {
    return (
        <Carousel fade interval={10000}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/PageImage/carousel01.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Blox Fruits</h3>
                    <p>รับเติมผลปีศาจเรท 7 รหัสไก่ตัน รับ Farm เวลตัน</p>
                    <Button className= "glow-on-hover" href='#page1'>ไปยังร้านค้า</Button>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/PageImage/carousel02.png"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>The Strongest Battlegrounds</h3>
                    <p>ขายผลปีศาจ รับเติม Gems สุ่มผลปีศาจ</p>
                    <Button className= "glow-on-hover" href='#page2'>ไปยังร้านค้า</Button>

                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/PageImage/carousel03.png"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Pet Simulator 99</h3>
                    <p>ขายสัตว์ อุปกรณ์ทำเควส รหัสราคาถูก รับเติมเปิดไข่เรท 7 ถูกที่สุด</p>
                    <Button className= "glow-on-hover" href='#page3'>ไปยังร้านค้า</Button>

                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Hm_Header;