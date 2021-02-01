import React from 'react'
import { useForm } from '../util/hooks'
import cn from 'classnames'
import { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { AuthContext } from '../context/auth'

const CreatePost = React.memo(({ noteState, setNoteState }) => {
    const { setNote } = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const { onChange, onSubmit, values } = useForm(() => {
        createNote()
    }, {
        title: '',
        body: '',
    })
    const [createNote, { loading }] = useMutation(CREATE_NOTE, {
        update(_, { data: { createNote } }) {
            setNote(createNote)
            setNoteState(false)
        },
        onError(err) {
            debugger
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })
    console.log(errors)
    return (
        <div className={cn(noteState && "create-note__active", "create-note")}>
            <div className="create-note_wrapp">
                <h2 className="create-note_h2">
                    Create note
                </h2>
                <form className="create-note__form" onSubmit={onSubmit}>
                    <input
                        className={cn(values.title.trim() === "" && errors.hasOwnProperty('title') && 'login__error', "create-note__input")}
                        label='Title'
                        placeholder='title'
                        name='title'
                        type="text"
                        error={errors.title ? true : false}
                        value={values.title}
                        onChange={onChange} />
                    {values.title.trim() === "" && errors.hasOwnProperty('title') && <div className={"form-summary_error"}>{errors.title}</div>}
                    <textarea
                        className={cn(values.body.trim() === "" && errors.hasOwnProperty('body') && 'login__error', "create-note__textarea")}
                        label='Body'
                        placeholder='text'
                        name='body'
                        type="text"
                        value={values.body}
                        error={errors.body ? true : false}
                        onChange={onChange} />
                    {values.body.trim() === "" && errors.hasOwnProperty('body') && <div className={"form-summary_error"}>{errors.body}</div>}
                    <button disabled={loading} className={cn(loading && 'loading', "create-note__button")}>
                        Сохранить
                </button>
                </form>
            </div>
        </div>
    )
})
const CREATE_NOTE = gql`
    mutation createNote(
        $title: String!
        $body: String!
    ){
        createNote(
                title: $title
                body: $body
            )
        {
            id body createdAt title username
        }
    }
`
export default CreatePost