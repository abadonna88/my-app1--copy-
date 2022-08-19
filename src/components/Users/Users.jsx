import React from "react";
import Paginator from '../common/Paginator/Paginator';
import User from "./User";


let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, followingInProgress, unfollow, follow, ...props}) => {
     
    return (<div>
        <Paginator  currentPage={currentPage} 
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                    onPageChanged={onPageChanged}/>
        
        {
            props.users.map( u => <User user={u} key={u.id} 
                                        followingInProgress={followingInProgress}
                                        unfollow={unfollow}
                                        follow={follow}/>)
        }
    </div>
    )
}
export default Users;