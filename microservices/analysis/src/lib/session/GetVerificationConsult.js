const GetUserAutentication = require('../integration/getUserAuthentication.js');
const GetVerificationConsultData = require('../datasource/GetVerificationConsultData');


module.exports = class GetVerificationConsult {
  constructor({
    auth,
  } = {}) {
    this._auth = auth;

    this._integrationAuthJwt = new GetUserAutentication();
    this._getVerificationConsultData = new GetVerificationConsultData();

    this._checkParameters();
  }

  async run() {
    try {
      await this._validateSession();

      const summary = await this._getVerificationConsult();

      return summary;
    } catch (err) {
      throw err;
    } finally {
      await this._getVerificationConsultData.closeConnection();
    }
  }

  async _getVerificationConsult() {
    try {
      await this._getVerificationConsultData.createConnection();

      const orders = await this._getVerificationConsultData.getVerifications();

      if (!orders) throw 'could not find orders';

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
      console.log('err GetVerificationConsult => ', err);
      throw err;
    }
  }
};
