import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
  productUpdateReducer,
  productCreateReducer,
  productReviewReducer
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userSignUpReducer,
  userListReducer,
  userDeleteReducer,
  userDetailReducer,
  userUpdateReducer
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderDeliveredReducer,
  orderListReducer,
  allOrderReducer,
  esewaVerifyReducer
} from "./reducers/orderReducer";

const reducer = combineReducers({
  productCreate: productCreateReducer,
  productReview: productReviewReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  orderDelivered: orderDeliveredReducer,
  orderList: orderListReducer,
  allOrder:allOrderReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  esewaVerify: esewaVerifyReducer
});
const cartItemsStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : null;
const paymentMethodStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsStorage,
    shippingAddress: shippingAddressStorage,
    paymentMethod: paymentMethodStorage,
  },
  userLogin: { userInfo: userInfoStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
