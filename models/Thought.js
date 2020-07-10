const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
// require('mongoose-type-email');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
      }
    // id: false
  }
  );
    // get total count of comments and replies on retrieval
    ThoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
      });

  // create the User model using the UserSchema
const Thought = model('Thought', ThoughtSchema);

// export the Pizza model
module.exports = Thought;