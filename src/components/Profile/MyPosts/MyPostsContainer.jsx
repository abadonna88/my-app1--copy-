import React from "react";
import { addPostActionCreator } from "../../../redux/profileReducer";
import { connect } from 'react-redux';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        posts: state.profilePage.postsData
    }    
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }    
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts); 

export default MyPostsContainer;