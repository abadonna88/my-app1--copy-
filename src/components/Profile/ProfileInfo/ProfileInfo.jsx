import React from "react";
import Preloader from "../../common/preloader/Preloader";
import style from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/photo.png';
import { useState } from "react";
import ProfileDataFormReduxForm from "./ProfileDataForm";


const ProfileInfo = (props) =>{

    let [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div className={style.descriptionBlock}>
                <img className={style.mainPhoto} src={props.profile.photos.large || userPhoto}></img>
                { props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                { editMode ? 
                    <ProfileDataFormReduxForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/>
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={() => {setEditMode(true)}}/>
                }
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

const ProfileData = ({profile, isOwner, toEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={toEditMode}>edit</button></div>}
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
        </div>
    </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={style.contact}><b>{contactTitle} : </b> {contactValue}</div>
}

export default ProfileInfo;