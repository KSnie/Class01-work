import { Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {

  return (
    <>
      <Button as="a" variant="primary">
        Button as link
      </Button>
      <Button as="a" variant="success">
        Button as link
      </Button>
    </>
  )
}

export default App
