import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/cartSlice.js';
import favoriteReducer from './slices/favoriteSlice.js'    
import languageReducer from "./slices/languageSlice.js";
import themeRreducer from "./slices/themeSlice.js"

const store = configureStore({
    reducer: {
        cart: counterReducer,
        favorite: favoriteReducer,
        language:languageReducer,
        theme:themeRreducer
    },

})

export default store;