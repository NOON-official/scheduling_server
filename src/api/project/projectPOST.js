const util = require('../../../src/lib/util');
const statusCode = require('../../../src/constants/statusCode');
const responseMessage = require('../../../src/constants/responseMessage');
const { projectDB } = require('../../../src/db');

module.exports = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(
        util.fail(statusCode.BAD_REQUEST, responseMessage.PROJECT_BLANK_BOX)
      );
  }

  try {
    let newProject = await projectDB.createProject(req.body);

    res.status(statusCode.OK).send(
      util.success(statusCode.OK, responseMessage.CREATE_PROJECT_SUCCESS, {
        project: newProject,
      })
    );
  } catch (error) {
    console.log(error);

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
