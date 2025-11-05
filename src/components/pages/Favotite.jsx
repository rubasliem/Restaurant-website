import logo from '../../images/favorite.png';
import { Icons, toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart} from '../../store/slices/cartSlice';
import { removeFromFavorite } from '../../store/slices/favoriteSlice';
import { useNavigate } from 'react-router-dom';
function Favorite() {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(state => state.favorite.items);
  const cartItems = useSelector(state => state.cart.items);

const handleAddToCartFromFavorite = (meal) => {
  const inCart = cartItems.find(item => item.id === meal.id);
  if (inCart) {
    toast.info(`Already in cart 🛒: ${meal.title}${Icons}`);
  } else {
    const itemToAdd = {
      ...meal,
      images: meal.images ? meal.images : [meal.image], // <-- هنا نتحقق
      quantity: 1,
    };
    dispatch(addToCart(itemToAdd));
    toast.success(`Added to cart 🛒: ${meal.title}`);
  }
};

  const navigate = useNavigate();

  function backToMenu() {
    navigate("/");
  }

  
  function goToCart() {
    navigate("/cart");
  }

  const handleRemoveFromFavorite = (meal) => {
    dispatch(removeFromFavorite(meal.id));
    toast.info(`Removed from Favorite 💔: ${meal.title}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center my-5"> Favorites <img src={logo} style={{width:'50px'}}/> </h1>
      <hr />
      <div className="row">
        {favoriteItems.length === 0 ? (
          <p className="text-center">No favorite meals yet 💔</p>
        ) : (
          favoriteItems.map(meal => (
            <div className="col-md-4 mb-4" key={meal.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={meal.images ? meal.images[0] : meal.image}
                  className="card-img-top"
                  alt={meal.title}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{meal.title}</h5>
                  <p className="card-text">💰 Price: {meal.price} EGP</p>
                  <div className="d-flex justify-content-around mt-3 gap-3">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleAddToCartFromFavorite(meal)}
                    >
                      Add to Cart 🛒
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveFromFavorite(meal)}
                    >
                      Remove from Favorite 💔
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='d-flex justify-content-center gap-3'>
            <button
                className="btn btn-secondary me-3 my-5 "
                onClick={backToMenu}
              >
                <i class="bi bi-arrow-left-short"></i> MENU <i class="bi bi-fork-knife"></i>
              </button>

            <button
                className="btn btn-secondary me-3 my-5 "
                onClick={goToCart}
              >
                CART <i class="bi bi-cart4"></i> <i class="bi bi-arrow-right-short"></i> 
              </button>
        </div>
    </div>
  );
}

export default Favorite;
