const Product = require('../../models/product');

module.exports = {
  index,
  show,
  create,
  edit: editProduct,
  delete: deleteProduct
};

async function index(req, res) {
  const products = await Product.find({});
  res.json(products);
}

async function show(req, res) {
  const product = await Product.findById(req.params.id);
  res.json(product);
}

// User (as a seller) can list for sale a new product
async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
  }
  try {
      const product = await Product.create(req.body);
      res.json(product);
  } catch (err) {
      res.status(500).json(err)
  }
}

// User (as a seller) can edit their own product
async function editProduct(req, res) {
  const product = await Product.findByIdAndUpdate({ _id: req.params.id, user: req.user._id });
  res.json(product);
}

// User (as a seller) can delete their own product
async function deleteProduct(req, res) {
  const product = await Product.deleteOne({ _id: req.params.id, user: req.user._id });
  res.json(product);
}