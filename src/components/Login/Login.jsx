import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input, createField } from '../common/FormsControl/FormsControl';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import style from "./../common/FormsControl/FormsControl.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type:'password'})}  
            {createField(null, 'rememberMe', [], Input, {type:'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField('symbols', 'captcha', [required], Input)}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
    </form>
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = (props) => {
    const onSubmit =(formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {

        return <Navigate to="/profile" />
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);