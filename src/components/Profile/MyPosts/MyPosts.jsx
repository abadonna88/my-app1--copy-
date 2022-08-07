import React from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { TextArea } from "../../common/FormsControl/FormsControl";

let maxLength10 = maxLengthCreator(10);

const MyPosts = (props) =>{
    let postElements = props.posts.map( (data, index) => <Post key={index} message={data.message} likesCount={data.likesCount} />);
    
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
    <div className={style.postsBlock}>
        <h3>My posts</h3>
        <div>
            <AddMPostFormRedux onSubmit={onAddPost}/>
        </div>
        <div className={style.posts}>
            { postElements }
        </div>
    </div>
    )
}

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field  component={TextArea}
                    name='newPostText' 
                    placeholder='add new post'
                    validate={[required, maxLength10]}/>
            <button>Add post</button>
        </form>
    )
}

const AddMPostFormRedux = reduxForm({form: 'profileAddPostForm'})(AddNewPostForm)

export default MyPosts;