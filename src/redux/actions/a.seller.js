import axios from 'axios';

import {
    GET_ALL_SELLERS,
    UPDATE_PRODUCT,
    ERRORS,
    MESSAGE,
    GET_ALL_ORDERS_OF_SELLER,
    SET_ALERT,
    GET_PRODUCT_BY_SELLER_AND_CAT
} from './ctes'

export function getAllSellers() {
    return async function (dispatch) {
        try {
            const sellers = await axios.get('/api/private/users/sellers');
            dispatch({type: MESSAGE, payload: sellers.data.msg})
            dispatch({type: GET_ALL_SELLERS, payload: sellers.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

//todo agregar header de seguridad
export function postProduct(product) {
    return async function (dispatch) {
        try {
            const response = await axios.post('/api/private/product', product);
            dispatch({type: SET_ALERT, payload: response.data.msg})
            dispatch({type: GET_PRODUCT_BY_SELLER_AND_CAT, payload: response.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function updateProduct (product, id) {
    return async function (dispatch) {
        try {
            const response = await axios.put(`/api/private/product/${id}`, product);
            dispatch({type: SET_ALERT, payload: response.data.msg});
            dispatch({type: UPDATE_PRODUCT, payload: response.data.data});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function ordersBySeller(id) {
    return async function (dispatch) {
        try {
            const orders = await axios.get(`/api/private/orderSellers/${id}`);
            dispatch({type: MESSAGE, payload: orders.data.msg})
            dispatch({type: GET_ALL_ORDERS_OF_SELLER, payload: orders.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}