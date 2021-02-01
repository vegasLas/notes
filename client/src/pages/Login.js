import React from "react"
import "../index.css"
import cn from "classnames"
import { useForm } from "../util/hooks"
import { gql, useMutation } from "@apollo/client"
import { useContext, useState } from "react"
import { AuthContext } from "../context/auth"

const Login = React.memo((props) => {
    const { login } = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const { onChange, onSubmit, values } = useForm(() => loginUser(), {
        username: '',
        password: '',
    })
    const [loginUser, { loading }] = useMutation(LOGIN, {
        update(_, { data: { login: userData } }) {
            login(userData)
            props.history.push('/')
        },
        onError(err) {
            debugger
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })
    const redirectToRegister = () => {
        props.history.push('/register')
    }
    debugger
    return (
        <div className="login">
            <div className="login__wrapp">
                <h1 className="login__h1">
                    Login
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
                        className={cn(values.password.trim() === "" && errors.hasOwnProperty('password') && 'login__error', "login__input ")}
                        label='password'
                        placeholder='password'
                        name='password'
                        type="text"
                        value={values.password}
                        onChange={onChange} />
                    {values.password.trim() === "" && errors.hasOwnProperty('password') && <div className={"form-summary_error"}>{errors.password}</div>}
                    {errors.hasOwnProperty('general') && <div className={"form-summary_error"}>{errors.general}</div>}
                    <button className={cn(loading && 'loading', "login__button")}>
                        <span className="login-button__text">login</span>
                    </button>
                </form>
                <div className="login__register register">
                    <span>
                        you don't have account?
                    </span>
                    <button onClick={redirectToRegister} className="login__button2">
                        <span className="login-button__text2">
                            register
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
})
const LOGIN = gql`
mutation login ($username: String! $password: String!) {
    login(username:$username password:$password) {
      id 
      email
      token
      username
      createdAt
    }
  }
`
export default Login