const GetUserAutentication = require('../integration/getUserAuthentication.js');
const GetOrderSummaryData = require('../datasource/GetOrderSummaryData');


module.exports = class GetOrderSummary {
  constructor({
    auth,
  } = {}) {
    this._auth = auth;

    this._integrationAuthJwt = new GetUserAutentication();
    this._getSummaryData = new GetOrderSummaryData();

    this._checkParameters();
  }


  async run() {
    try {
      await this._validateSession();

      const summary = await this._getOrderSummary();

      return summary;
    } catch (err) {
      throw err;
    } finally {
      await this._getSummaryData.closeConnection();
    }
  }

  async _getOrderSummary() {
    try {
      await this._getSummaryData.createConnection();

      const orders = await this._getSummaryData.getSummary();
      
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async _validateSession() {
    try {
      const res = await this._integrationAuthJwt.validateSession({
        token: this._auth,
      });
      
      if (!res || res.status !== 200) throw 'could not validate session';
    } catch (err) {
      throw err;
    }
  }

  _checkParameters() {
    try {
      if (!this._auth) throw (400, { auth: 'undefined' });
    } catch (err) {
      console.log('err getOrdeSummary => ', err);
      throw err;
    }
  }
};
