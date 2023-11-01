const Tip = require("../models/tip");

module.exports = {
  create,
  delete: deleteComment 
};

async function create(req, res) {
  const tip = await Tip.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  tip.comments.push(req.body);
  try {
    // Save any changes made to the movie doc
    await tip.save();
  } catch (err) {
    //   console.log(err);
  }
  res.redirect(`/tips/${tip._id}`);
}


async function deleteComment(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const tip  = await Tip.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
  // Rogue user!
  if (!tip) return res.redirect('/tips');
  // Remove the review using the remove method available on Mongoose arrays
  tip.comments.remove(req.params.id);
  // Save the updated movie doc
  await tip.save();
  // Redirect back to the movie's show view
  res.redirect(`/tips/${tip._id}`);
}