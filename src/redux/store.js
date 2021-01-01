import { createStore } from "redux";
import userReducer from "./user/reducer";


export default createStore(userReducer);