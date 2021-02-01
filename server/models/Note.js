const { model, Schema } = require('mongoose')


const noteSchema = new Schema({
    body: String,
    title: String,
    createdAt: String,
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Note', noteSchema)