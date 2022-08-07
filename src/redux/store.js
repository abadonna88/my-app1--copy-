import dialogReducer from "./dialogReducer";
import profileReducer from "./profileReducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Post1', likesCount: 12},
                {id: 2, message: 'Post2', likesCount: 1}
              ],
            newPostText: "hello!"
        },
        messagesPage: {
            dialogsData: [
                {id: 1, name: 'Sergey'},
                {id: 2, name: 'Andrey'}
            ],
            messagesData: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'How are you?'},
            ],
            newMessageBody: ""
        }
    },
    getState(){
        return this._state;
    },
    _callSubscriber(){
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogReducer(this._state.messagesPage, action);
        
        this._callSubscriber(this._state);

    },
    subscribe(observer){
        this._callSubscriber = observer;
    }
}

export default store;