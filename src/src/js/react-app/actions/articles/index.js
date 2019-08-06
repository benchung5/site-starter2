import axios from 'axios';
import { searchArticles } from '../global';
//config
const env = process.env.NODE_ENV || "development";
var {SERVER_URL} = require('../../config')[env];


import {
    FETCH_ARTICLES,
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    GET_ARTICLE,
    ADD_ARTICLE_ERROR,
    UPDATE_ARTICLE_ERROR,
    SEARCH_ARTICLES_ADMIN
    } from '../types';

export function fetchArticles() {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/articles/all`)
        .then(response => {

            dispatch({
                type: FETCH_ARTICLES,
                payload: response.data
             });
            return Promise.resolve();

        })
        .catch((err) => {
            console.log('error fetching articles', err);
            //todo: if request is bad
            // dispatch(fetchArticlesError('response.data.error'));
        });
    }
}

export function getArticle(slug) {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/articles/single/${slug}`)
        .then(response => {
            //if no response data, return a formatted object
            let data = {};
            if (!response.data ) {
                data = {
                    category: [],
                    themes: [],
                    // make images null so we know it's an intentional clear
                    // an empty array makes it show the placeholder image
                    images: null
                }
            } else {
                data = response.data;
            }
            
            dispatch({
                type: GET_ARTICLE,
                payload: data
             });
        })
        .catch((err) => {
            console.log('error getting article: ', err);
        });
    }
}

export function addArticle(formData) {
    //needed for image file submission
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    return function(dispatch) {
        axios.post( `${SERVER_URL}/articles/create`, formData, config )
        .then( response => {
            if(response.data.error) {
                dispatch(addArticleError(`There was an error creating the article: ${response.data.error}`));
            } else {
                dispatch({
                    type: ADD_ARTICLE,
                    payload: response.data
                });
            }
        })
        .catch((err) => {
            dispatch(addArticleError(`there was an error creating the article: ${err}`));
        });
    }
}

export function updateArticle(formData) {
    //needed for image file submission
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }
    return function(dispatch) {
        // post to http://192.168.99.100/api/articles/update
        axios.post( `${SERVER_URL}/articles/update`, formData, config )
        .then( response => {
            if(response.data.error) {
                dispatch(updateArticleError(`there was an error updating the article: ${response.data.error}`));
            } else {
                dispatch({
                    type: UPDATE_ARTICLE,
                    payload: response.data
                });
            }
        })
        .catch((err) => {
            console.log('there was an error updating the article: ', err);
            //dispatch(updateArticleError(`there was an error updating the article: ${err}`));
        });
    }
}

export function deleteArticle(article, search, offset, limit) {
        return function(dispatch, getState) {
        // post to http://192.168.99.100/articles/delete
        axios.post( `${SERVER_URL}/articles/delete`, { article } )
        .then( response => {
            if(response.data.error) {
                console.log('error: ', response.data.error);
                //dispatch(deleteArticleError(`there was an error deleting the article: ${response.data.error}`));
            } else {
                //get the new list of articles now that one is deleted
                dispatch(searchArticles(getState().global));
            }
        })
        .catch((err) => {
            console.log('error deleting the article: ', err);
        });
    }
}

export function duplicateArticle(slug, search, offset, limit) {
        return function(dispatch) {
        // post to http://192.168.99.100/articles/delete
        axios.post( `${SERVER_URL}/articles/duplicate`, { slug } )
        .then( response => {
            if(response.data.error) {
                console.log('error: ', response.data.error);
                //dispatch(duplicateArticleError(`there was an error duplicating the article: ${response.data.error}`));
            } else {
                //get the new list of articles now that one is deleted
                dispatch(searchArticles(getState().global()));
            }
        })
        .catch((err) => {
            console.log('error duplicating the article: ', err);
        });
    }
}

export function clearArticle() {
    return {
        type: ADD_ARTICLE,
        payload: ''
    }
}

export function clearArticleError(error) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: ''
    }
}

export function clearUpdateArticle() {
    return {
        type: UPDATE_ARTICLE,
        payload: ''
    }
}

export function addArticleError(error) {
    return {
        type: ADD_ARTICLE_ERROR,
        payload: error
    }
}

export function updateArticleError(error) {
    return {
        type: UPDATE_ARTICLE_ERROR,
        payload: error
    }
}