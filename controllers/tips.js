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
  res.render("tips/show", { title: "REPLY", tip });
}

function newTip(req, res) {
  res.render("tips/new", { title: "Add Tip", errorMsg: "" });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try {
    const tip = await Tip.create({ ...req.body, user: req.user._id });
    res.redirect(`/tips`);
  } catch (err) {
    // Some sort of validation error
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
