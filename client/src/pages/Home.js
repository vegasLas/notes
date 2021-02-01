import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import '../index.css'
import { AuthContext } from '../context/auth'
import { FETCH_NOTES_QUERY } from '../util/graphql'
import Note from './Note'
import { Redirect } from 'react-router-dom'
import CreatePost from './CreateNote'



const Home = React.memo(() => {
    const [noteState, setNoteState] = useState(false)
    const { data } = useQuery(FETCH_NOTES_QUERY)
    const { user, logout, notes, setNotes } = useContext(AuthContext)
    useEffect(() => {
        if (data)
            setNotes(data)
    }, [data])
    let lists;
    !data ? lists = <div className='loading notes'> Loaing notes</div>
        : lists = notes.map(m =>
            <Note key={m.id} username={m.username} body={m.body} createdAt={m.createdAt} title={m.title} id={m.id} />)
    if (user) {
        return (
            <div className="home">
                <button onClick={logout} className="home__logout-btn">Logout</button>
                <h1 className="home__h1">
                    Notes
            </h1>
                <button onClick={() => setNoteState(true)} className="home__button">
                    add note
                </button>
                <CreatePost setNoteState={setNoteState} noteState={noteState} />
                <div className="home__notes">
                    {lists}
                </div>
            </div>
        )
    }
    return <Redirect to="/login" />
})
export default Home