import React from "react";
import Preloader from "../../common/preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/photo.png';

const ProfileInfo = (props) =>{
    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <div className={style.descriptionBlock}>
                <img className={style.mainPhoto} src={props.profile.photos.large || userPhoto}></img>
                { props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;