const Category = require('../model/category.model');

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../library/responseHelper');

const index = async (req, res) => {
  try {
    const categories = await Category.query();

    if (categories.length === 0) {
      return sendErrorResponse(res, 404, 'No categories found!', [
        { item_name: 'categories', message: 'No categories found!' },
      ]);
    }

    sendSuccessResponse(res, 200, 'OK!', categories);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const store = async (req, res) => {
  try {
    const category = await Category.query().insert({
      name: req.body.name,
    });

    sendSuccessResponse(res, 200, 'Success create!', category);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const show = async (req, res) => {
  try {
    const category = await Category.query().findById(req.params.id);

    sendSuccessResponse(res, 200, 'OK!', category);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const update = async (req, res) => {
  try {
    const category = await Category.query().patchAndFetchById(req.params.id, {
      name: req.body.name,
    });

    sendSuccessResponse(res, 200, 'Success update!', category);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const destroy = async (req, res) => {
  try {
    await Category.query().deleteById(req.params.id);

    sendSuccessResponse(res, 200, 'Category success delete!', {
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
