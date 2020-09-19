const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const errorResponseTreatment = require('../lib/utils');

const summary = require('./summary/get');
const lastMonth = require('./orderByMonth/get');
const consultVerification = require('./verificationConsult/get');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/analysis/order-summary', async (req, res) => {
  try {
    const response = await summary.run(req);
    
    res.status(200).send(response);
  } catch (err) {
    const responseError = errorResponseTreatment(err);
    
    res.status(responseError.status).send(responseError);
  }
});

app.get('/analysis/last-month', async (req, res) => {
  try {
    const response = await lastMonth.run(req);
    
    res.status(200).send(response);
  } catch (err) {
    const responseError = errorResponseTreatment(err);
    
    res.status(responseError.status).send(responseError);
  }
});

app.get('/analysis/consulta-verificacao', async (req, res) => {
  try {
    const response = await consultVerification.run(req);
    
    res.status(200).send(response);
  } catch (err) {
    const responseError = errorResponseTreatment(err);
    
    res.status(responseError.status).send(responseError);
  }
});

app.listen(3020, () => {
  console.log('Ouvindo na porta 3020!');
});
