const GenericDao = require('./GenericDao');

const {
  TABLE_ORDEM_SERVICO,
} = require('../constants/database');

module.exports = class GetOrderSummaryData extends GenericDao {
  async getSummary() {
    const [rows] = await this._mysql.query(/* SQL */`
      SELECT
        (SELECT count(*) FROM ${TABLE_ORDEM_SERVICO} WHERE Status_idStatus = ?) as openOrders,
        (SELECT count(*) FROM ${TABLE_ORDEM_SERVICO} WHERE Status_idStatus = ?) as currentOrders,
        (SELECT count(*) FROM ${TABLE_ORDEM_SERVICO} WHERE Status_idStatus = ?) as finishOrders,
        (SELECT count(*) FROM ${TABLE_ORDEM_SERVICO} WHERE Status_idStatus = ?) as canceledOrders
      FROM ${TABLE_ORDEM_SERVICO}
      GROUP BY openOrders
    `, [1, 2, 3, 4, 5]);

    return this.parseSelectResponse(rows);
  }
};
