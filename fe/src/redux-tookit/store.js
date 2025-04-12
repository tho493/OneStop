import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import mainReducer from "./mainSlide";
import studentReducer from "./studentSlice";
import documentReducer from './documentSlice';
import categoryTypeReducer from "./categoryTypeSlice";
import typeItemReducer from "./typeItemSlice";
import detailReducer from "./detailSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    main: mainReducer,
    student: studentReducer,
    document: documentReducer,
    categoryType: categoryTypeReducer,
    typeItem: typeItemReducer,
    detail: detailReducer,
  },
});

export default store;