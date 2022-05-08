const util = require("../../../src/lib/util");
const statusCode = require("../../../src/constants/statusCode");
const responseMessage = require("../../../src/constants/responseMessage");
const { cardDB } = require("../../../src/db");
const logger = require("../../config/winston");

module.exports = async (req, res) => {
  const isEmpty = (value) => {
    if (value === "" || value === null || value === undefined) {
      return true;
    } else {
      return false;
    }
  };

  const { content, deadline, state } = req.body;

  if (isEmpty(content) || isEmpty(deadline) || isEmpty(state)) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.CARD_BLANK));
  }

  try {
    const newCard = await cardDB.createCard(req.body);

    res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          responseMessage.CREATE_CARD_SUCCESS,
          newCard
        )
      );
  } catch (error) {
    console.log(error);
    logger.error(error.toString());

    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  } finally {
  }
};
