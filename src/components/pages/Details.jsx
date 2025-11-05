import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice.js";  
import { toast } from "react-toastify";
import { addToFavorite, removeFromFavorite } from "../../store/slices/favoriteSlice.js";
const categoryInfo  = {
  "Breakfast": { icon: "🍳", price: 85 , time: 25 },
  "Miscellaneous": { icon: "🍽️", price: 50 , time: 30 },
  "Starter": { icon: "🥗", price: 60 , time: 10 },
  "Soup": { icon: "🥣", price: 65 , time: 20 },
  "Beef": { icon: "🥩", price: 120 , time: 20},
  "Lamb": { icon: "🍖", price: 110 , time: 60 },
  "Goat": { icon: "🐐", price: 95 , time: 60 },
  "Chicken": { icon: "🍗", price: 90 , time: 35},
  "Seafood": { icon: "🐟", price: 100 , time: 30},
  "Pasta": { icon: "🍝", price: 80 , time: 15 },
  "Pork": { icon: "🥓", price: 100 , time: 25 },
  "Side": { icon: "🍟", price: 40 , time: 30 },
  "Vegan": { icon: "🥦", price: 75 , time: 20 },
  "Vegetarian": { icon: "🥕", price: 70 , time: 45 },
  "Dessert": { icon: "🍰", price: 70 , time: 40 },
  "Drink": { icon: "🍹", price: 55 , time: 7 }
};

function Details() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);  
  const param = useParams();
  const dispatch = useDispatch();

  const favoriteItems = useSelector((state) => state.favorite.items);
  const inFavorite = favoriteItems.find(item => item.id === meal.idMeal);

  //const BASE_URL = process.env.REACT_APP_MEALDB_BASE;

  const cartItems = useSelector((state) => state.cart.items);
    const inCart = cartItems.find(item => item.id === meal.idMeal);
  // ⏳ fetch meal details
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param.id}`)

      .then((res) => {
        if (res.data.meals && res.data.meals.length > 0) {
          setMeal(res.data.meals[0]);  
        }
      });
  }, [param.id]);


  // 📌 category info
  function getCategoryInfo(category) {
    return categoryInfo[category] || { icon: "🍽️", price: 70, time: 30 };
  }

  // 🛒 add to cart
  function handleAddToCart(meal) {
    if(inCart){
        toast.info(`${meal.strMeal} ${icon} Already in cart 🛒`);
    }else{
    if (!meal) return; 
    const { price, icon } = getCategoryInfo(meal.strCategory);
    const itemToAdd = { ...meal, price };
    
    dispatch(addToCart(itemToAdd));
    toast.success(`${meal.strMeal} ${icon} Added to Cart 🛒 Price: ${price} EGP 💵`);
  }
}

  // ❤️ toggle favorite

  function toggleFavorite(meal) {
    if (!meal) return;

  if (inFavorite) {
    dispatch(removeFromFavorite(meal.idMeal));
    toast.info(`Removed from Favorite 💔: ${meal.strMeal}`);
  } else {
    const itemToAdd = {
      id: meal.idMeal,
      title: meal.strMeal,
      price: categoryInfo[meal.strCategory]?.price || 70,
      image: meal.strMealThumb,
    };
    dispatch(addToFavorite(itemToAdd));
    toast.success(`Added to Favorite ❤️: ${meal.strMeal}`);
  }
}

  function backToMenu() {
    navigate('/');
  }

  if (!meal) {
    return <div>Loading ...</div>;
  }

  const { price, time, icon } = getCategoryInfo(meal.strCategory);

  return (
    <div className="container my-5">
      <div className="row align-items-start">
        
        {/* 🖼️ meal image */}
        <div className="col-md-6">
          <img
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="img-fluid rounded shadow-sm"
            style={{ width: "75%", maxHeight: "400px", objectFit: "cover" }} 
          />
        </div>

        {/* 📋 meal details */}
        <div className="col-md-6 justify-content-center text-center">
          <div className="d-flex justify-content-center gap-3 ">
            <h2 className="mb-3">{meal.strMeal}</h2>
            <i 
              className={`bi ${inFavorite ? "bi-heart-fill text-danger" : "bi-heart text-danger"} fs-4 mt-2`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleFavorite(meal)}
            ></i>
          </div>
          <hr/>
          <div className="container start-0 text-start ms-5">
            <p className="mt-3">
              <strong>Category:</strong> {meal.strCategory} {icon} <br />
              <strong>Area:</strong> {meal.strArea} <br />
              <strong>Price:</strong> {price} EGP 💵 <br />
              <strong>Preparation Time:</strong> {time} minutes ⏱️ <br />
              <strong>Type:</strong> {meal.strTags}
              {meal.strTags && meal.strTags.toLowerCase().includes("spicy") ? "🌶️" : "❄️"} <br/>
            </p>
            <strong>Ingredients:</strong>
            <ul>
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return (
                  ingredient && (
                    <li key={i}>
                      {ingredient} - {measure}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
          <button 
            className="btn btn-success mt-4 py-2" 
            onClick={() => handleAddToCart(meal)}
          >
            Add to Cart 🛒
          </button>
        </div>

        {/* 🔙 back button */}
        <div className="mt-4 pt-2">
            <button
                className="btn btn-secondary me-3 my-5 "
                onClick={backToMenu}
              >
                <i class="bi bi-arrow-left-short"></i> MENU <i class="bi bi-fork-knife"></i>
              </button>
        </div>

      </div>
    </div>
  );
}

export default Details;




