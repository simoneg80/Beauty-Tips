const Tip = require("../models/tip");

module.exports = {
  create,
  delete: deleteComment,
  update: updateComment,
  edit,
};

async function create(req, res) {
  const tip = await Tip.findById(req.params.id);

  // Add the user-centric info to req.body (the new comment)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // Push the new comment onto the tip's comments array
  tip.comments.push(req.body);
  try {
    // Save any changes made to the tip doc
    await tip.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/tips/${tip._id}`);
}

async function deleteComment(req, res) {
  const tip = await Tip.findOne({
    "comments._id": req.params.id,
    "comments.user": req.user._id,
  });
  // Rogue user!
  if (!tip) return res.redirect("/tips");
  // Remove the review using the remove method available on Mongoose arrays
  tip.comments.remove(req.params.id);
  // Save the updated tip doc
  await tip.save();
  // Redirect back to the movie's show view
  res.redirect(`/tips/${tip._id}`);
}

async function updateComment(req, res) {
  const tip = await Tip.findOne({
    "comments._id": req.params.id,
    "comments.user": req.user._id,
  });
  if (!tip) return res.redirect("/tips");
  const comment = tip.comments.id(req.params.id);
  comment.content = req.body.content;
  await tip.save();
  res.redirect(`/tips/${tip._id}`);
}

async function edit(req, res) {
  const tip = await Tip.findOne({
    "comments._id": req.params.id,
    "comments.user": req.user._id,
  });
  const comment = tip.comments.id(req.params.id);
  console.log(tip);
  res.render("comments/edit", { comment, title: "Edit Comment" });
}
