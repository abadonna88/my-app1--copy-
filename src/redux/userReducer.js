import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS= 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    
    //     {id: 1, photoUrl: 'https://img.texasmonthly.com/2013/04/CRITTER_680X382.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&h=1400&ixlib=php-1.2.1&q=45&w=1400', followed: false, fullName: 'Dmitry', status: 'he-he', location: {city: 'Minsk', country: 'Belarus'}},
    //     {id: 2, photoUrl: 'https://img.texasmonthly.com/2013/04/CRITTER_680X382.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&h=1400&ixlib=php-1.2.1&q=45&w=1400', followed: true, fullName: 'Sergey', status: 'efesf-he', location: {city: 'Saint Petersburg', country: 'Russia'}},
    //     {id: 3, photoUrl: 'https://img.texasmonthly.com/2013/04/CRITTER_680X382.jpg?auto=compress&crop=faces&fit=crop&fm=jpg&h=1400&ixlib=php-1.2.1&q=45&w=1400',  followed: false, fullName: 'Sasha', status: 'sefsef-he', location: {city: 'Sofia', country: 'Bulgaria'}},
    //   ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};



export const userReducer = (state=initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return { 
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
                // users: state.users.map( u => {
                //     if (u.id === action.userID){
                //         return {...u, followed: true}
                //     }
                //     return u;
                // })
            }
        case UNFOLLOW:
            return { 
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
                // users: state.users.map( u => {
                //     if (u.id === action.userID){
                //         return {...u, followed: false}
                //     }
                //     return u;
                // })
            }
        case SET_USERS:
            return {...state, users: action.users}
        
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state,
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

export const followSuccess = (userID) => ({ type: FOLLOW, userID })
export const unfollowSuccess = (userID) => ({ type: UNFOLLOW, userID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount }) 
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let response = await usersAPI.getUsers(page, pageSize);
            dispatch(setUsers(response.items));
            dispatch(setTotalUsersCount(response.totalCount));
            dispatch(toggleIsFetching(false));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);
        if (response.data.resultCode ===0){
            dispatch(actionCreator(userId));
        }

    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

export default userReducer;