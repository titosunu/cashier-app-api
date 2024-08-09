const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const products = await Product.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    const product = await Product.query().insert({
      name: req.body.name,
      category_id: req.body.category_id,
      price: req.body.price,
      stock: req.body.stock,
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.query().patchAndFetchById(req.params.id, {
      name: req.body.name,
      category_id: req.body.category_id,
      price: req.body.price,
      stock: req.body.stock,
    });

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
