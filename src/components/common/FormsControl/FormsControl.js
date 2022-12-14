import React from 'react';
import { Field } from 'redux-form';
import styles from "./FormsControl.module.css";

const FormControl = ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = error && touched
    return(
        <div className={styles.formControl + ' ' + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            { hasError && <span>{error}</span>}
        </div>
    )
}

// export const TextArea = ({input, meta, ...props}) => {
//     const hasError = meta.error && meta.touched
//     return(
//         <div className={styles.formControl + ' ' + (hasError ? styles.error : "")}>
//             <div>
//                 <textarea {...input} {...props} />
//             </div>
//             { hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }

export const TextArea = (props) =>{
    const {input, meta, child, ...restProps} =props;
    return (<FormControl{...props}><textarea {...input} {...restProps} /></FormControl>)
}


// export const Input = ({input, meta, ...props}) => {
//     const hasError = meta.error && meta.touched
//     return(
//         <div cpropslassName={styles.formControl + ' ' + (hasError ? styles.error : "")}>
//             <div>
//             <input {...input} {...props} />
//             </div>
//             { hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }

export const Input = (props) =>{
    const {input, meta, child, ...restProps} =props;
    return (<FormControl{...props}><input {...input} {...restProps} /></FormControl>)
}

export const createField = (placeholder, name, validators, component, props ={}, text = '') => (
    <div>
        <Field  placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
        /> {text}
    </div>
)