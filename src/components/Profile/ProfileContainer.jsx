import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
// import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus } from '../../redux/profileReducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { Navigate, useParams} from "react-router-dom";
import { useDispatch } from "react-redux";

class ProfileContainer extends React.Component {

    componentDidMount(){
        // let userId = this.props.match.params.userId;
        let userId = null;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                <Navigate replace to="/login" />
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} 
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}), withAuthRedirect)(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(ProfileContainer);

// const ProfileContainer = (props) => {
//     const profile = useSelector((store) => store.profilePage.profile);
//     const status = useSelector((store) => store.profilePage.status);
//     const authorizedUserId = useSelector((store) => store.auth.userId);
//     const isAuth = useSelector((store) => store.auth.isAuth);
//     const { userId } =useParams();
//     const dispatch = useDispatch(); 
//     useEffect(() => {
//         if (!userId) {
//             userId = authorizedUserId;
//             if (!userId) {
//                 <Navigate replace to="/login" />
//             }
//         }
//         dispatch(getUserProfile(userId));
//         dispatch(getStatus(userId));
//     }
//     , [userId, authorizedUserId])

//     return (
//             <Profile
//                 profile={profile}
//                 status={status}
//                 updateStatus={updateStatus}
//             />
//         )
// }

// export default ProfileContainer;