import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Authentication from './Authentication';
import './Header.css'; // Assuming this is where your styles are defined

const Header = () => {
    return (
        <div>
            {/* Background element */}
            <div className='text-white d-flex justify-content-center align-items-center m-0 h-auto' style={{ backgroundImage: 'linear-gradient(111.4deg, rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2%)', height: '60px', marginBottom: '20px' }}>
                Online Shop made by NNN Dev
            </div>

            {/* Navbar component */}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                            alt=""
                            src="/logo.svg" // Adjust the path to your actual logo
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        NNN Shop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: '100px', fontWeight: '400' }} navbarScroll>
                            <Nav.Link href="#action1">หน้าหลัก</Nav.Link>
                            <NavDropdown title="ซื้อสินค้า" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Blox Fruits</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">The Strongest Battlegrounds</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Pet Simulator 99</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Robux Rate:7</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#action2">เติมเงิน</Nav.Link>
                            <Nav.Link href="#action2">สุ่มรางวัล</Nav.Link>
                        </Nav>
                        <Authentication />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
