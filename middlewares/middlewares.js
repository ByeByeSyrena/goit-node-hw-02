const { dataValidator } = require("../helpers");

const validateFields = async (req, res, next) => {
  try {
    const { body } = req;

    const { error } = await dataValidator(body);

    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = validateFields;
