import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {SendMessageCreator} from "../../redux/dialogReducer";
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }    
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody)=> {
            dispatch(SendMessageCreator(newMessageBody));
        }
    }       
}
export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
