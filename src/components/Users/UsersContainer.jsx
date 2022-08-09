import React from "react";
import { connect } from 'react-redux';
import { requestUsers, follow, setCurrentPage, unfollow} from "../../redux/userReducer";
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getUsers, getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, isFetching, getUsersSuper, getUsersSuperSelector } from "../../redux/usersSelectrors";

class UsersAPIComponent extends React.Component {
    
    componentDidMount(){
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }

    render(){
        return <>
            <Preloader isFetching={this.props.isFetching} />
            <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      onPageChanged={this.onPageChanged}
                      unfollow={this.props.unfollow}
                      follow={this.props.follow}
                      followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
    return {
        // users: state.usersPage.users,
        // users: getUsers(state),
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: isFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(connect(mapStateToProps,
    {follow, unfollow, setCurrentPage, requestUsers}), withAuthRedirect)(UsersAPIComponent);