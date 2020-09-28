const mysql = require('mysql');

const ORDERS_TABLE = 'ordemServico';
const NOTE_TABLE = 'Apontamento';
const STATUS_TABLE = 'Status';

module.exports = class GetOrderNoteData {
  constructor() {
    this.mysql = '';

    this.createConnection();
  }

  async getOrderNote() {
    return new Promise((resolve, reject) => {
      this.mysql.query(/* sql */ `
        SELECT ordem_service.idOrdemServico, ordem_service.dataEmissao, ordem_service.tipoManutencao_idtipoManutencao,
                note_order.descricao_atividade,note_order.idApontamento, 
                note_order.sequencia, note_order.tempo
              FROM ${ORDERS_TABLE} AS ordem_service
            INNER JOIN ${NOTE_TABLE} AS note_order ON note_order.ordemServico_idOrdemServico = ordem_service.idOrdemServico
            INNER JOIN ${STATUS_TABLE} AS status_order ON status_order.idStatus = ordem_service.Status_idStatus
            WHERE status_order.tipoStatus != ? AND  status_order.tipoStatus != ? GROUP BY ordem_service.idOrdemServico;
      `, [1, 3], (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
    });
  }

  async createConnection() {
    try {
      const connection = mysql.createConnection({
        host: 'duasrodasdb.cjh4gc3id4wo.sa-east-1.rds.amazonaws.com',
        user: 'adminDuasRodas',
        password: 'twowheels2020',
        database: 'duasrodas',
      });

      connection.connect(err => {
        if (err) throw err;
      });
      
      this.mysql = connection;
    } catch (err) {
      throw err;
    }
  }

  closeConnection() {
    this.mysql.end();
  }
};
