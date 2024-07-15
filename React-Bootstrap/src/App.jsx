import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header'
import Hompage from './page/Hompage';
import Fotter from './component/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hompage />
      <Fotter />
    </div>
  );
}


export default App
