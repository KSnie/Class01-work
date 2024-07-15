import './Authentication.css'
import Button from 'react-bootstrap/Button';

const Authentication = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Button className= "px-3 mx-2 button-reg" href='#Register'>Register</Button>
            <Button className= "px-3 mx-2 button-log" href='#Login'>Login</Button>
        </div>
    )
}

export default Authentication;
