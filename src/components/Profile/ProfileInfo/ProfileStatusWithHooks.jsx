import React from "react";
import { useState, useEffect } from "react";
import style from "./ProfileStatus.module.css";

const ProfileStatusWithHooks = (props) => { 

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    
    useEffect( () => {
        setStatus(props.status);
    }, [props.status]
    );
    
    const activateMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    return(
        <div>
            { !editMode &&
                <div>
                    <b>Status: </b>
                    <span onDoubleClick={activateMode}>{props.status || '========'}</span>
                </div>
            }
            { editMode &&
                <div>
                    <input onChange={onStatusChange} 
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                    value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;