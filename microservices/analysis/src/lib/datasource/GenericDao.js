const { createConnection } = require('mysql2/promise');

module.exports = class GenericDao {
  constructor() {
    this._mysql = {};
  }
  
  async createConnection() {
    try {
      const connection = await createConnection({
        host: 'duasrodasdb.cjh4gc3id4wo.sa-east-1.rds.amazonaws.com',
        user: 'adminDuasRodas',
        password: 'twowheels2020',
        database: 'duasrodas',
      });

      connection.connect();
      
      this._mysql = connection;
    } catch (err) {
      throw err;
    }
  }

  async closeConnection() {
    await this._mysql.end();
  }

  parseSelectResponse(resultSet = []) {
    const resultMapped = resultSet.reduce((acc, i) => {
      const newItem = { ...i };

      acc.push(newItem);
      return acc;
    }, []);

    if (resultMapped.length === 1)
      return resultMapped[0];

    return resultMapped;
  }

  parseInsertResponse(resultSet) {
    return JSON.parse(JSON.stringify(resultSet));
  }
};
