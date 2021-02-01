import React from "react"
import { gql, useMutation } from "@apollo/client"
import { useContext } from "react"
import { AuthContext } from "../context/auth"
import "../index.css"
import moment from "moment"

const Note = React.memo(({ username, title, body, createdAt, id }) => {
    moment.locale('ru')
    var date1 = moment(createdAt);
    var date2 = moment(Date.now());
    var minutes = date2.diff(date1, "m");
    var hours = date2.diff(date1, "h");
    var days = date2.diff(date1, "d");
    let date;
    days > 0 ? date = `${minutes} days` : hours > 0 ? date = `${hours} hours` : date = `${minutes} minutes`
    const { deleteNote, user } = useContext(AuthContext)

    const [deleteNoteMut, { loading }] = useMutation(DELETE_NOTE, {
        variables: {
            noteId: id
        }
    })
    const onSubmit = () => {
        deleteNoteMut()
        deleteNote(id)
    }
    return (
        <div className="note">
            <div className="note__wrapp">
                <div className="note__column">
                    <div className="note__discription">title: </div>
                    <div className="note__title"> {title}</div>
                    <div className='note__createdAt'> {moment(createdAt).format("h:mm a DD:MM:YYYY")}</div>
                </div>
                <div className="note__column">
                    <div className="note__discription">body: </div>
                    <div className="note__content">{body}</div>
                    {username === user.username && < button onClick={onSubmit} className='note__button note-button'><span className="note-button__text">delete</span></button>}
                </div>
                <div className='note__time-passed'>
                    {date} ago
                </div>
            </div>
        </div >
    )
})
const DELETE_NOTE = gql`
    mutation deleteNote(
        $noteId: ID!
    ){
        deleteNote(noteId: $noteId)
    }
`
export default Note