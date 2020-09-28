const GetUserAutentication = require('../integration/getUserAuthentication.js');
const GetOrderNoteData = require('../datasource/getOrderNoteData');


module.exports = class GetOrderNote {
  constructor({
    auth,
  } = {}) {
    this._auth = auth;

    this._integrationAuthJwt = new GetUserAutentication();
    this._getOrderNote = new GetOrderNoteData();

    this._checkParameters();
  }


  async run() {
    try {
      await this._validateSession();
      
      const orderNote = await this._getOrderNoteUser();

      return orderNote;
    } catch (err) {
      throw err;
    } finally {
      this._getOrderNote.closeConnection();
    }
  }

  async _getOrderNoteUser() {
    try {
      const orders = await this._getOrderNote.getOrderNote();

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
      console.log('err getOrdeSummary => ', err);
      throw err;
    }
  }
};
