import React from "react";
import Preloader from "../../common/preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) =>{
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={style.descriptionBlock}>
                <img src ={props.profile.photos.large}></img>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;