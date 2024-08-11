const Transaction = require('../model/transaction.model');
const TransactionDetail = require('../model/transaction.detail.model');
const Product = require('../model/product.model');

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../library/responseHelper');

const totalAmountAndTransactionDetails = async (products) => {
  let totalAmount = 0;
  const transactionDetails = [];

  for (const item of products) {
    const product = await Product.query().findById(item.product_id);

    if (!product || product.stock < item.quantity) {
      throw new Error(`Product with ID ${item.product_id} not found!`);
    }

    const subTotal = product.price * item.quantity;

    totalAmount += subTotal;

    transactionDetails.push({
      product_id: item.product_id,
      quantity: item.quantity,
      subtotal: subTotal,
    });

    await Product.query()
      .patch({ stock: product.stock - item.quantity })
      .where('id', item.product_id);
  }

  return { totalAmount, transactionDetails };
};

const index = async (req, res) => {
  try {
    const transactions = await Transaction.query()
      .select('id', 'user_id', 'total_amount', 'transaction_date')
      .withGraphFetched('[user(selectUsername), details]')
      .modifiers({
        selectUsername(builder) {
          builder.select('username');
        },
      });

    if (transactions.length === 0) {
      return res.status(404).json({
        message: 'No transactions found!',
      });
    }

    sendSuccessResponse(res, 200, 'OK!', transactions);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const store = async (req, res) => {
  const trx = await Transaction.startTransaction();
  try {
    const { user_id, products } = req.body;

    // calculate total amount and transaction details
    const { totalAmount, transactionDetails } =
      await totalAmountAndTransactionDetails(products);

    // Save transaction
    const transaction = await Transaction.query(trx).insert({
      user_id,
      total_amount: totalAmount,
      transaction_date: new Date().toISOString().slice(0, 10),
    });

    // Save transaction details
    for (const detail of transactionDetails) {
      await TransactionDetail.query(trx).insert({
        ...detail,
        transaction_id: transaction.id,
      });
    }

    await trx.commit();

    sendSuccessResponse(res, 201, 'Transaction successfully', transaction);
  } catch (error) {
    await trx.rollback();
    console.log(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const show = async (req, res) => {
  try {
    const transaction = await Transaction.query()
      .findById(req.params.id)
      .withGraphFetched('details');

    sendSuccessResponse(res, 200, 'OK!', transaction);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

const destroy = async (req, res) => {
  try {
    await Transaction.query().deleteById(req.params.id);

    sendSuccessResponse(res, 200, 'Transaction deleted successfully!', {
      id: req.params.id,
    });
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

module.exports = {
  index,
  store,
  show,
  destroy,
};
