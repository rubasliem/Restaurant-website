import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Footer from './components/Footer/Footer.jsx'
import Navbar from '././components/Navbar/Navbar.jsx';
import RoutesList from './routes/index.jsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <div className='my-5'>
          <RoutesList/>
        </div>
        <Footer/>
      </BrowserRouter>

      {/* لازم يكون بره  Router */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
