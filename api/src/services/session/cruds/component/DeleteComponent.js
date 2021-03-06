const ComponentsDao = require('../../../dao/cruds/ComponentsDao');

const { ADMINISTRADOR_ID } = require('../../../../shared/constants/accessLevel');
const { get } = require('lodash');
const { STATUS_UNAUTHORIZED, MESSAGE_UNAUTHORIZED } = require('../../../../shared/constants/HTTPResponse');

module.exports = class DeleteComponent {
  constructor() {
    this._queryResult = '';
  }

  getParameters(req) {
    return {
      updateId: get(req.params, 'id', ''),
      mysql: get(req, 'mysql'),
      authData: get(req, 'authData', ''),
    };
  }

  checkParameters({ updateId, mysql, authData }) {
    return {
      ...(!updateId ? { numeroCracha: 'ID do equipamento não infomado' } : ''),
      ...(!mysql ? { mysql: 'Conexão não estabelecida' } : ''),
      ...(!authData ? { authData: 'Dados de autenticação não encontrados' } : ''),
    };
  }

  async run(req) {
    try {
      const parameters = this.getParameters(req);

      const errors = this.checkParameters(parameters);
      if (Object.values(errors).length > 0) throw errors;

      await this.validateGroups(parameters);
      await this.deleteComponent(parameters);

      if (!this._queryResult.affectedRows)
        throw 'Não foi possível deletar o componente';

      return this._queryResult;
    } catch (err) {
      console.log('err DeleteComponent :>> ', err);

      throw err;
    }
  }

  async deleteComponent(parameters) {
    this._queryResult = await new ComponentsDao(parameters).deleteComponent();
  }

  async validateGroups({ authData }) {
    if (authData.nivel_acesso !== ADMINISTRADOR_ID)
      throw { status: STATUS_UNAUTHORIZED, message: MESSAGE_UNAUTHORIZED };
  }
};
