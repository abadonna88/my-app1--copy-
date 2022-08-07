import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { TextArea } from '../common/FormsControl/FormsControl';
import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Message from './Message/Message';

let maxLength100 = maxLengthCreator(100);

const Dialogs = (props) => {    
    let state = props.messagesPage;
    let dialogElements = state.dialogsData.map( dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);
    let messageElements = state.messagesData.map( message => <Message message={message.message} key={message.id}/>);
    
    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    return(
        <div className={style.dialogs}>
            <div className={style.dialogItems}>
                { dialogElements }    
            </div>
            <div className={style.messages}>
                { messageElements }
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field  component={TextArea}
                    name='newMessageBody'
                    placeholder='Enter new message' 
                    validate={[required, maxLength100]}/>
            <button >post</button>   
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;