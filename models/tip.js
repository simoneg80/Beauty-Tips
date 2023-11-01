const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  //   user: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true
  //   },
  //   userName: String,
  //   userAvatar: String
  // }, {
  //   timestamps: true
});

const tipsSchema = new Schema(
  {
    title: { type: String, required: true },
    //   releaseYear: {
    //     type: Number,
    //     default: function() {
    //       return new Date().getFullYear();
    //     },
    //   },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

// Compile the schema into a model and export it
module.exports = mongoose.model("Tip", tipsSchema);
