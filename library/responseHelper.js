const sendSuccessResponse = (res, status, message, data) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const sendErrorResponse = (res, status, message, errors = []) => {
  res.status(status).json({
    errors: errors.length ? errors : [{ item_name: 'error', message }],
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
