const Router = require('express');

const errorResponseTreatment = require('../../../shared/utils/utils');

const router = Router();

// const RegisterVerification = require('../../session/movimentations/verifications/RegisterVerification');

// router.post('/', async (req, res, next) => {
//   try {
//     const response = await new RegisterVerification().run(req);

//     next();
//     res.status(200).send(response);
//   } catch (err) {
//     const responseError = errorResponseTreatment(err);
    
//     res.status(responseError.status).send(responseError);
//   }
// });

module.exports = router;
