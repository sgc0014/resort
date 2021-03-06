import Axios from "axios";


export const createProduct = (product) => async (dispatch, getState) => {
  
    try {
      
      dispatch({ type: "PRODUCT_CREATE_REQUEST" });
      const { userInfo } = getState().userLogin;
  
      const { data } = await Axios.post(
        `http://localhost:5000/api/products/create`,
        product
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: "PRODUCT_CREATE_SUCCESS",
      });
     
      dispatch({
        type: "PRODUCT_CREATE_RESET",
      });
  
      
    } catch (error) {
      dispatch({
        type: "PRODUCT_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
export const postproductReview = (review,productId) => async (dispatch, getState) => {

    try {
      
      dispatch({ type: "PRODUCT_REVIEW_REQUEST" });
      const { userInfo } = getState().userLogin;
     
      const { data } = await Axios.post(
        `http://localhost:5000/api/products/${productId}/review`,
        review
        ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: "PRODUCT_REVIEW_SUCCESS",
      });
     
      dispatch({
        type: "PRODUCT_REVIEW_RESET",
      });
  
      
    } catch (error) {
      dispatch({
        type: "PRODUCT_REVIEW_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProducts = (filter={},keyword='') => async (dispatch) => {
  try {
  
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await Axios.post(`http://localhost:5000/api/products?keyword=${keyword}`,filter);
   
    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({ type: "PRODUCT_LIST_FAIL",  payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
  }
};
export const filterProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await Axios.get(`http://localhost:5000/api/products`);
   
    dispatch({
      type: "PRODUCT_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({ type: "PRODUCT_LIST_FAIL",  payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAIL_REQUEST" });
    const { data } = await Axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_DETAIL_FAIL",  payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, });
  }
};

export const postproductUpdate = (product) => async (dispatch, getState) => {

  try {
    
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });
    const { userInfo } = getState().userLogin;

    const { data } = await Axios.post(
      `http://localhost:5000/api/products/updateproduct/${product.id}`,
      product
      ,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: "PRODUCT_UPDATE_SUCCESS",
    });
    dispatch({
      type: "PRODUCT_DETAIL_SUCCESS",
      payload:data
    });
    dispatch({
      type: "PRODUCT_UPDATE_RESET",
    });

    
  } catch (error) {
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productdelete = (id) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: "PRODUCT_DELETE_REQUEST" });
    const { userInfo } = getState().userLogin;
    const { data } = await Axios.put(
      "http://localhost:5000/api/products/deleteproduct",
      {id},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
      payload: data,
    });

    
  } catch (error) {
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
