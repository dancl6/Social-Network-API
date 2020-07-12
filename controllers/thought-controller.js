const { User, Thought } = require('../models');

const thoughtController ={

  getAllThoughts(req, res) {
    Thought.find({})
    //   .populate({
    //     path: 'thoughts',
    //     path: 'friends',
    //     select: '-__v'
    //   })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    //   .populate({
    //     path: 'thoughts',
    //     path: 'friends',
    //     select: '-__v'
    //   })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  createThought({body }, res) {
    console.log(" i am at create thought")
    console.log(body.userId)
    Thought.create(body)

    .then(({ _id }) =>{
        console.log(" i am at create thought 2")
        // console.log(_id)
        console.log(body.userId)
        // console.log(body)
    User.findOneAndUpdate(
        {_id: body.userId},
        { $push: {thoughts: _id }},
        {new: true}
    )
    .then(dbThoughtData => {
        console.log("i am at create thoughts response")
        console.log(dbThoughtData)
        res.json(dbThoughtData)})
        .catch(err => res.status(400).json(err));
    })    
  },
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
//   addFriend({ params }, res) {
//     console.log("I'm at add friend")
//     console.log(params);
//     User.findOneAndUpdate(
//       {_id: params.userId},
//       { $push: { friends: params.friendId }}
//     )
//     .then(dbFriend => {
//       if (!dbFriend) {
//         res.status(404).json({ message: 'No user found with this id!' });
//         return;
//       }
//       res.json(dbFriend);
//     })
//     .catch(err => res.json(err));
// }
}

module.exports = thoughtController;