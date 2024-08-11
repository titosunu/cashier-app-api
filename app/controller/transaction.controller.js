const Transaction = require("../model/transaction.model");
const TransactionDetail = require("../model/transaction.detail.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const transaction = await Transaction.query().withGraphFetched("user");

    res.status(200).json({
      data: transaction,
      message: "Success get transaction",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  const trx = await Transaction.startTransaction();
  try {
    const { user_id, products } = req.body;

    let totalAmount = 0;
    const transactionDetails = [];

    // Hitung totalAmount dan buat transactionDetails
    for (const item of products) {
      const product = await Product.query().findById(item.product_id);

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      transactionDetails.push({
        product_id: item.product_id,
        quantity: item.quantity,
        subtotal: subtotal,
      });

      // Update stok produk
      await Product.query()
        .patch({ stock: product.stock - item.quantity })
        .where("id", product.id);
    }

    // Simpan transaksi
    const transaction = await Transaction.query(trx).insert({
      user_id,
      total_amount: totalAmount,
      transaction_date: new Date().toISOString().slice(0, 10),
    });

    // Simpan detail transaksi
    for (const detail of transactionDetails) {
      await TransactionDetail.query(trx).insert({
        ...detail,
        transaction_id: transaction.id,
      });
    }

    await trx.commit();

    res.status(201).json({
      data: transaction,
      message: "Transaction created successfully",
      status: 201,
    });
  } catch (error) {
    await trx.rollback();
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  try {
    const transaction = await Transaction.query()
      .findById(req.params.id)
      .withGraphFetched("details");

    res.status(200).json({
      data: transaction,
      message: "Ok!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const transaction = await Transaction.query().deleteById(req.params.id);

    res.status(200).json({
      data: transaction,
      message: "Success delete transaction",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  store,
  show,
  destroy,
};
