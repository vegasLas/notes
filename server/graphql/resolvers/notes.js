const Note = require('../../models/Note')
const checkAuth = require('../../util/check-auth')
const { AuthenticationError, UserInputError } = require('apollo-server');
const { validateInput } = require('../../util/validators');
const moment = require('moment');
module.exports = {
    Query: {
        async getNotes() {
            try {
                const notes = await Note.find().sort({ createdAt: -1 });
                return notes;
            } catch (err) {
                throw new Error(err)
            }
        },
    },
    Mutation: {
        async createNote(_, { body, title }, context) {
            const user = checkAuth(context)
            console.log(user)
            const { errors, valid } = validateInput(body, title)
            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }
            const newNote = new Note({
                username: user.username,
                title,
                user: user.id,
                body,
                createdAt: new Date().toISOString()
            });
            const note = await newNote.save()
            context.pubsub.publish('NEW_NOTE', {
                newNote: note
            })
            return note
        },
        async deleteNote(_, { noteId }, context) {
            debugger
            const user = checkAuth(context);
            try {
                const note = await Note.findById(noteId);
                if (user.username === note.username) {
                    await note.delete();
                    return 'Note deleted successfully'
                } else {
                    throw new AuthenticationError("Action not allowed")
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },

}
