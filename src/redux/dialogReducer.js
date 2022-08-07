const SEND_MESSAGE ='SEND_MESSAGE';

let initialState = {
    dialogsData: [
        {id: 1, name: 'Sergey'},
        {id: 2, name: 'Andrey'}
    ],
    messagesData: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'How are you?'},
    ]
};

export const dialogReducer = (state=initialState, action) => {
    let stateCopy;

    switch(action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            stateCopy = {
                ...state,
                messagesData: [...state.messagesData, {id: 7, message: body}]
            };
            return stateCopy;
        
        default:
            return state;
    }
}
    
export const SendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogReducer;