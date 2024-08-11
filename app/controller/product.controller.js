const Product = require('../model/product.model');

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../library/responseHelper');

const index = async (req, res) => {
  try {
    const products = await Product.query();

    if (products.length === 0) {
      return sendErrorResponse(res, 404, 'No products found!', [
        { item_name: 'products', message: 'No products found!' },
      ]);
    }

    sendSuccessResponse(res, 200, 'OK!', products);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
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

    sendSuccessResponse(res, 201, 'Product created successfully!', product);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.query().findById(req.params.id);

    sendSuccessResponse(res, 200, 'OK!', product);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
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

    sendSuccessResponse(res, 200, 'Product updated successfully!', product);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const destroy = async (req, res) => {
  try {
    await Product.query().deleteById(req.params.id);

    sendSuccessResponse(res, 200, 'Product deleted successfully!', {
      id: req.params.id,
    });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
