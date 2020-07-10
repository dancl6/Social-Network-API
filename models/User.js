const { Schema, model } = require('mongoose');
const moment = require('moment');
var mongoose = require('mongoose');
require('mongoose-type-email');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        type: mongoose.SchemaTypes.Email
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
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
    UserSchema.virtual('friendCount').get(function() {
        return this.friends.length;
      });

  // create the User model using the UserSchema
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;