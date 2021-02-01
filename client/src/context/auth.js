import React, { useReducer } from 'react'
import jwtDecode from 'jwt-decode'
const initialState = {
    user: null,
    notes: []
}
if (localStorage.getItem('jwt')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwt'))
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt')
    } else {
        initialState.user = decodedToken;
    }
}
const AuthContext = React.createContext({
    user: null,
    notes: [],
    login: (userData) => { },
    logout: () => { },
    setNote: (note) => { },
    setNotes: (notes) => { },
    deleteNote: (id) => { },

})

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        case 'SET_NOTES':
            return {
                ...state,
                notes: action.notes.getNotes
            }
        case 'SET_NOTE':
            return {
                ...state,
                notes: [action.note,...state.notes]
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: [...state.notes].filter(m => m.id !== action.id)
            }
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(userData) {
        localStorage.setItem('jwt', userData.token)
        dispatch({
            type: "LOGIN",
            payload: userData
        })
    }
    function logout() {
        localStorage.removeItem('jwt')
        dispatch({
            type: "LOGOUT"
        })
    }
    function setNotes(notes) {
        dispatch({
            type: "SET_NOTES",
            notes
        })
    }
    function setNote(note) {
        dispatch({
            type: "SET_NOTE",
            note
        })
    }
    function deleteNote(id) {
        dispatch({
            type: "DELETE_NOTE",
            id
        })
    }
    return (
        <AuthContext.Provider
            value={{ user: state.user, notes: state.notes, deleteNote, setNote, setNotes, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }