import { createSlice } from "@reduxjs/toolkit";


const languageSlice = createSlice({
    name: "language",
    initialState: { language: "en" },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            if(action.payload === "ar"){
                document.body.dir = "rtl";
                document.body.style.textAlign = "right";
            }else{
                document.body.dir = "ltr";
                document.body.style.textAlign = "left";
            }
        }
    }
})

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language.language;
export default languageSlice.reducer;   
