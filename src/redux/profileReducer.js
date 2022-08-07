import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD-Post';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postsData: [
        {id: 1, message: 'Post1', likesCount: 12},
        {id: 2, message: 'Post2', likesCount: 1}
      ],
    profile: null,
    status: '========'
};

export const profileReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_POST:{
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount:0
            };
            let stateCopy = {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return{
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    });
}

export const setStatus = (status) => ({type: SET_STATUS, status})
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus().then(response => {
        dispatch(setStatus(response.data));
    });
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0){
            dispatch(setStatus(response.data));
        }
    });
}
export default profileReducer;