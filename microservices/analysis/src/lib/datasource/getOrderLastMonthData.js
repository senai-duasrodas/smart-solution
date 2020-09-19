const GenericDao = require('./GenericDao');

const {
  TABLE_ORDEM_SERVICO,
} = require('../constants/database');

module.exports = class GetOrderSummaryData extends GenericDao {
  async getOrderLastMonth() {
    const [rows] = await this._mysql.query(/* SQL */`
      SELECT
        count(*) AS Quantity,
        dataEmissao AS OpeningDate
      FROM ${TABLE_ORDEM_SERVICO}
      WHERE dataEmissao BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()
      GROUP BY WEEK (dataEmissao);
    `);

    return this.parseSelectResponse(rows);
  }
};
