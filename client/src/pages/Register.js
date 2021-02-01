import "../index.css"
import cn from "classnames"
import React from "react"
import { useForm } from "../util/hooks"
import { gql, useMutation } from "@apollo/client"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"

const Register = React.memo((props) => {
    const { login } = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const { onChange, onSubmit, values } = useForm(() => registerUser(), {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    })
    const redirectToLogin = () => {
        props.history.push('/login')
    }
    const [registerUser, { loading }] = useMutation(REGISTER, {
        update(_, { data: { register } }) {
            login(register)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: {
            registerInput: values
        }
    })
    console.log(errors)
    return (
        <div className="login">
            <div className="login__wrapp">
                <h1 className="login__h1">
                    Register
                </h1>
                <form onSubmit={onSubmit} className="login__form">
                    <input
                        className={cn(values.username.trim() === "" && errors.hasOwnProperty('username') && 'login__error', "login__input ")}
                        label='username'
                        placeholder='username'
                        name='username'
                        type="text"
                        value={values.username}
                        onChange={onChange} />
                    {values.username.trim() === "" && errors.hasOwnProperty('username') && <div className={"form-summary_error"}>{errors.username}</div>}
                    <input
                        className={cn(values.email.trim() === "" && errors.hasOwnProperty('email') && 'login__error', "login__input ")}
                        label='email'
                        placeholder='email'
                        name='email'
                        type="text"
                        value={values.email}
                        onChange={onChange} />
                    {values.email.trim() === "" && errors.hasOwnProperty('email') && <div className={"form-summary_error"}>{errors.email}</div>}
                    <input
                        className={cn(values.password.trim() === "" && errors.hasOwnProperty('password') && 'login__error', "login__input ")}
                        label='password'
                        placeholder='password'
                        name='password'
                        type="text"
                        value={values.password}
                        onChange={onChange} />
                    {values.password.trim() === "" && errors.hasOwnProperty('password') && <div className={"form-summary_error"}>{errors.password}</div>}
                    <input
                        className={cn(values.confirmPassword.trim() !== values.password.trim() && errors.hasOwnProperty('confirmPassword') && 'login__error', "login__input ")}
                        label='confirmPassword'
                        placeholder='confirmPassword'
                        name='confirmPassword'
                        type="text"
                        value={values.confirmPassword}
                        onChange={onChange} />
                    {values.confirmPassword.trim() !== values.password.trim() &&  errors.hasOwnProperty('confirmPassword') && <div className={"form-summary_error"}>{errors.confirmPassword}</div>}
                    <button className={cn(loading && 'loading', "login__button")}>
                        <span className="login-button__text">register</span>
                    </button>
                </form>
                <div className="login__register register">
                    <span>
                        Do you have account?
                    </span>
                    <button onClick={redirectToLogin} className="login__button2">
                        <span className="login-button__text2">
                            login
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
})
const REGISTER = gql`
mutation register($registerInput:RegisterInput) {
    register(registerInput:$registerInput) {
      id
      email
      token
      username
      createdAt
    }
  }
`
export default Register