import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Nav from './components/Nav/Nav';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { connect } from "react-redux";
import { initializeApp } from './redux/appReducer';
import Preloader from "./components/common/preloader/Preloader";


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (this.props.initialized) {
      return <Preloader />
    }

    return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <HeaderContainer />
          <Nav />
          <div className='app-wrapper-content'>
            <Routes>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/profile/:userId' element={<ProfileContainer />} />
              <Route path='/users' element={<UsersContainer/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/profile' element={<ProfileContainer/>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initilized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);
