import logo from '../../images/logo5.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, selectLanguage } from '../../store/slices/languageSlice.js';
import { setTheme} from '../../store/slices/themeSlice.js';

function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorite.items);

  const lang = useSelector(selectLanguage);

  const handleChangeLang = (lang) => {
    dispatch(setLanguage(lang));
  };

  const handleChangeTheme = (theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid rounded-3" style={{ backgroundColor: "#cfe2ff" }}>
        <img className='m-0' src={logo} style={{  width: "140px", borderRadius: "50%", transform: "scale(1.5)" }} alt="logo" />
        <a className="navbar-brand me-3 fw-bold fs-3" href="#">RESTO</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/">
               {lang === "ar" ? "الوجبات" : "Meals"} <i className="bi bi-fork-knife"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/cart">
                {lang === "ar" ? "الطلبات" : "Cart"} 
                <span className="bg-danger p-1 rounded mx-1 py-0 text-light">{cartItems.length}</span> 
                <i className="bi bi-cart4"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/favorites">
                {lang === "ar" ? "المفضلة" : "Favorites"} 
                <span className="bg-danger p-1 rounded mx-1 py-0 text-light">{favoriteItems.length}</span> 
                <i className="bi bi-heart-half"></i>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/contact">
                {lang === "ar" ? "تواصل معنا" : "Contact Us"} <i className="bi bi-chat-heart"></i>
              </Link>
            </li>


            <li className="nav-item dropdown">
              <a className="nav-link fs-5 " role="button" data-bs-toggle="dropdown" id="navbarDropdown"  aria-expanded="false">
                {lang === "ar" ? "اللغة" : "Language"} <i className="bi bi-globe2 fs-6"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => handleChangeLang("ar")}>العربية</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleChangeLang("en")}>English</button>
                </li>
              </ul>
            </li>

       
            <li className="nav-item dropdown">
              <a className="nav-link fs-5" role="button" data-bs-toggle="dropdown" id="navbarDropdown"  aria-expanded="false">
                {lang === "ar" ? "الاضاءة" : "Theme"} <i className="bi bi-cloud-moon fs-6"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-light">
                <li><a className="dropdown-item" onClick={()=>handleChangeTheme("light")}>Light <i className="bi bi-lightbulb"></i></a></li>
                <li><a className="dropdown-item" onClick={()=>handleChangeTheme("dark")}>Dark <i className="bi bi-lightbulb-fill"></i></a></li>
              </ul>
            </li>
          </ul>

          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active fs-5 me-2" to="/login">
                <i className="bi bi-search-heart me-1"></i>{lang === "ar" ? "تسجيل الدخول" : "Log-In"}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active fs-5" to="/register">
                {lang === "ar" ? "إنشاء حساب" : "Sign-Up"}
              </Link>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
