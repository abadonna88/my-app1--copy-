import React from "react";
import style from "./Post.module.css";

const Post = (props) =>{
    return <div>
        <div className={style.item}>
            <img src='https://infosmi.net/wp-content/uploads/2021/06/11-12.jpg'></img>
            {props.message}
            <div>
                <span>like</span>
                <span>dislike</span>
            </div>
        </div>
    </div>
}

export default Post;