const Tip = require("../models/tip");
const User = require('../models/user');

module.exports = {
  index,
  show,
  new: newTip,
  create,
  delete: deleteTip,
  edit,
  update: updateTip,
};

async function index(req, res) {
  const tips = await Tip.find({}).populate("user");
  console.log(tips);
  res.render("tips/index", { title: "All Tips", tips });
  
}

async function show(req, res) {
  const tip = await Tip.findById(req.params.id).populate({
    path: "comments",
    populate: {
      path: "user",
    },
  });
  //   const performers = await Performer.find({ _id: { $nin: movie.cast } }).sort('name');
  res.render("tips/show", { title: "REPLY", tip });
}

function newTip(req, res) {
  // We'll want to be able to render an
  // errorMsg if the create action fails
  res.render("tips/new", { title: "Add Tip", errorMsg: "" });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  //   req.body.nowShowing = !!req.body.nowShowing;
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new movie
    const tip = await Tip.create({ ...req.body, user: req.user._id });
    // Redirect to the new movie's show functionality
    res.redirect(`/tips`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("tips/new", { errorMsg: err.message });
  }
}

async function deleteTip(req, res) {
  await Tip.findByIdAndDelete(req.params.id);
  res.redirect("/tips");
}

async function updateTip(req, res) {
  const tip = await Tip.findById(req.params.id);
  if (!tip.user.equals(req.user._id)) return res.redirect("/tips");
  await Tip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.redirect("/tips");
}

async function edit(req, res) {
  const tip = await Tip.findById(req.params.id);
  console.log(tip);
  if (!tip.user.equals(req.user._id)) return res.redirect("/tips");
  res.render("tips/edit", { title: "Edit Tip", tip });
}
