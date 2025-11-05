
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { decrement, increment, reset, clearCart, selectCartTotal } from "../../store/slices/cartSlice.js";
import logoCart from '../../images/cartNavbar.png'


function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function backToMenu() {
    navigate("/");
  }

    function goToFavorite() {
    navigate("/favorites");
  }

    function confirmOrder() {
    navigate("/confirm");
  }

  return (
    <>
      <h1 className="text-center my-5"> Cart<img src={logoCart} style={{width:'90px'}}/> </h1>
      <hr />

      {cartItems.length === 0 ? (
        <p className="text-center my-5">No Items in Cart <i class="bi bi-cart-x"></i></p>
      ) : (
        <div className="container">
          {cartItems.map((meal) => (
            <div
              key={meal.id}
              className="d-flex align-items-center border rounded p-3 mb-3"
            >
            <img
             src={meal.images ? meal.images[0] : meal.strMealThumb}
             alt={meal.title || meal.strMeal}
             style={{ width: "100px", objectFit: "cover" }}
            />

                <div className="text-start ms-3">
                <h5>{meal.title}</h5>
                <p className="mb-1">
                  <strong>Price:</strong> ${meal.price}
                </p>
                <p className="mb-1">
                  <strong>Amount:</strong> {meal.quantity}
                </p>
                <p className="mb-0 text-success fw-bold">
                  Total: ${meal.price * meal.quantity}  
                </p>
              </div>

              <div className="btn-group ms-auto mx-3" role="group">
                <button
                  className="btn btn-secondary"
                  onClick={() => dispatch(decrement(meal.id))}
                >
                  -1
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => dispatch(reset(meal.id))}
                >
                  Reset
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => dispatch(increment(meal.id))}
                >
                  +1
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex my-4">
            <h4 className="mx-4"><span className="fw-bold text-success">Grand Total: </span>{total} EGP</h4>
            <button className="btn btn-success me-3" onClick={confirmOrder}> Order Now <i class="bi bi-cash-coin"></i></button>

            <button className="btn btn-outline-danger ms-auto mx-4" onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>

      <div className='d-flex justify-content-center gap-3 my-5'>
            <button
                className="btn btn-secondary me-3 my-5 "
                onClick={backToMenu}
              >
                <i class="bi bi-arrow-left-short"></i> MENU <i class="bi bi-fork-knife"></i>
              </button>

            <button
                className="btn btn-secondary me-3 my-5 "
                onClick={goToFavorite}
              >
                FAVORITE <i class="bi bi-heart-fill"></i> <i class="bi bi-arrow-right-short"></i> 
              </button>
        </div>
        </div>
      )}
    </>
  );
}

export default Cart;