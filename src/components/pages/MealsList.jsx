import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import menu from '../../images/meal.png';
import { useNavigate } from "react-router";
import logo from '../../images/logo.png';
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import { addToFavorite, removeFromFavorite } from "../../store/slices/favoriteSlice";
import { useSelector } from "react-redux";

function MealsList() {
  const [meals, setMeals] = useState([]); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("Seafood"); //default

//const BASE_URL = process.env.REACT_APP_MEALDB_BASE;
const cartItems = useSelector((state) => state.cart.items);
const favoriteItems = useSelector((state) => state.favorite.items);

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

    useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then((res) => setCategories(res.data.meals))
      .catch((err) => console.error("Error fetching meals:", err));
  }, []);


  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then((res) => setMeals(res.data.meals))
      .catch((err) => console.error("Error fetching seafood meals:", err));
  }, [selectedCategory]);


  // Toggle Cart
const toggleCart = (meal) => {
  if (!meal) return; 

  const itemInCart = cartItems.find(item => item.id === meal.idMeal);

  if (itemInCart) {
    dispatch(removeFromCart(meal.idMeal)); 
    toast.info(`Removed from cart 🛒: ${meal.strMeal}`);
  } else {
    const itemToAdd = {
      id: meal.idMeal,
      title: meal.strMeal,
      price: categoryInfo[meal.strCategory]?.price || 70,
      quantity: 1,
      images: [meal.strMealThumb],
    };
    dispatch(addToCart(itemToAdd));
    toast.success(`Added to cart 🛒: ${meal.strMeal}`);
  }
};

  // Toggle Favorite

function toggleFavorite(meal) {
  if (!meal) return;

  const itemInFav = favoriteItems.find(item => item.id === meal.idMeal);
  
  if (itemInFav) {
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

  return (

    <div className="container-fluid my-5">
        <div className="row">

         {/* Categories Sidebar */}
    <div className="col-md-3 bg-light p-3 my-5 shadow rounded-4 " style={{ backgroundColor: "#cfe2ff"}}>
      <h4 className="mb-4 text-center">  <img src={logo} style={{ width: "40px"}} alt="logo"/> Meal Categories <img src={logo} style={{ width: "40px"}} alt="logo" /> </h4>
      <ul className="list-group">
        {categories.map((cat) => (
            <li
                key={cat.strCategory}       
                className={`list-group-item d-flex justify-content-between align-items-center my-1 rounded-3 ${selectedCategory === cat.strCategory ? 'active' : ''}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory(cat.strCategory)}
            >
                <span className="me-2">
                 {categoryInfo[cat.strCategory]?.icon || "🍽️"}
                </span>
                {cat.strCategory}
                </li>
        ))}
        </ul>
    </div>


     {/* Meals  */}
    <div className="col-md-9 my-5">
      <h2 className="text-center my-3 fs-1 text-uppercase">
        {selectedCategory} Menu <img src={menu} style={{ width: "50px"}} alt="logo"/>
      </h2>
      <hr/>
      <div className="d-flex flex-wrap justify-content-center gap-4 my-3">
        {meals.map((meal) => {
          const inCart = cartItems.find(item => item.id === meal.idMeal);
          const inFavorite = favoriteItems.find(item => item.id === meal.idMeal);

            function handleDetails(id) {
             navigate(`/details/${id}`);}

          return (
            <div
              className="card p-2"
              key={meal.idMeal}
              style={{ width: "16rem", cursor: "pointer" }}
            >
              <img
                src={meal.strMealThumb}
                className="card-img-top"
                alt={meal.strMeal}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-start">
                <h5 className="card-title">{meal.strMeal}</h5>
                <hr />

                <div className="d-flex justify-content-between">
                  <p><strong>Price:</strong> {categoryInfo [selectedCategory]?.price || 70} EGP 💵</p>

                  <i
                    className={`bi ${inCart ? "bi-basket3-fill text-success" : "bi-basket3 text-secondary"} fs-4`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleCart(meal)}
                  ></i>
                </div>

                <p><strong>Prepare:</strong> {categoryInfo [selectedCategory]?.time || 30} min ⏱️</p>

                <div className="d-flex justify-content-between mt-3">
                  <button        className="btn btn-outline-secondary me-3"
                    onClick={() => handleDetails(meal.idMeal)}
                  >
                    Details <i className="bi bi-search-heart-fill"></i>
                  </button>

                  <i className={`bi ${inFavorite ? "bi-heart-fill text-danger" : "bi-heart text-danger"} fs-4 mt-2`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleFavorite(meal)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

     
    </div>
    </div>
  );
}

export default MealsList;
