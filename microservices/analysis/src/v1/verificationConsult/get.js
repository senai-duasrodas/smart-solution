const { get } = require('deep-object-js');

const GetVerificationConsult = require('../../lib/session/GetVerificationConsult');

const getParameters = req => ({
  auth: get(req.headers, 'authorization'),
});

const checkParameters = ({
  auth,
} = {}) => ({
  ...(!auth ? { auth: 'undefined' } : ''),
});

const run = async req => {
  try {
    const parameters = getParameters(req);

    const errors = checkParameters(parameters);
    if (Object.values(errors).length > 0) throw errors;

    const response = await new GetVerificationConsult(parameters).run();

    return response;
  } catch (err) {
    console.log('err GetVerifications :>> ', err);

    throw err;
  }
};

module.exports = {
  run,
};
