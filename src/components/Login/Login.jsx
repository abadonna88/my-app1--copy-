import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControl/FormsControl';
import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import style from "./../common/FormsControl/FormsControl.module.css"

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                <Field  placeholder={'Email'}
                        name={'email'}
                        validate={[required]}
                        component={Input} />
            </div>
            <div>
                <Field  placeholder={'Password'}
                        name={'password'}
                        validate={[required]}
                        type='password'
                        component={Input}/>
            </div>
            <div>
                <Field  type={'checkbox'}
                        name={'rememberMe'}
                        component={Input}/> remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
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
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {

        return <Navigate to="/profile" />
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);