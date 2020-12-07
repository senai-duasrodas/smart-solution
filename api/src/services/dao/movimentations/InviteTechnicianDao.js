const GenericDao = require('../GenericDao');

const { TABLE_ORDEM_SERVICO_HAS_USUARIO } = require('../../../shared/constants/database');
const { TABLE_ORDEM_SERVICO } = require('../../../shared/constants/database');

module.exports = class InviteTechnicianDao extends GenericDao {
    constructor({
        idOrdemServico,
        idUsuario,
        excluded,
        Status_idStatus,
        mysql,
        authData
    } = {}){
        super();

        this._idOrdemServico = idOrdemServico;
        this._idUsuario = idUsuario;
        this._excluded = excluded;
        this._Status_idStatus = Status_idStatus;
        this._mysql = mysql;
        this._authData = authData;
    }
    async statusOrdemServico(){
        // const values = {

        // }
        const [rows] = await this._mysql.query(
            `SELECT ${TABLE_ORDEM_SERVICO}.Status_idStatus FROM ${TABLE_ORDEM_SERVICO}
             WHERE ${TABLE_ORDEM_SERVICO}.idOrdemServico = ?`,[this._idOrdemServico]
        )
    }

    async inviteTechnicianRegister(){

        const values = {
            ordemServico_idOrdemServico: this._idOrdemServico,
            Usuario_idUsuario: this._idUsuario,
            excluded: this._excluded
        }

        const [rows] = await this._mysql.query(
            `INSERT INTO ${TABLE_ORDEM_SERVICO_HAS_USUARIO} SET ?;`,[values])

        return this.parseInsertResponse(rows);
    }
    async consultTechnician(){
        const values = {
            ordemServico_idOrdemServico: this._idOrdemServico
        }

        const[rows] = await this._mysql.query(`SELECT ${TABLE_ORDEM_SERVICO_HAS_USUARIO}.excluded FROM ${TABLE_ORDEM_SERVICO_HAS_USUARIO} 
        WHERE ${TABLE_ORDEM_SERVICO_HAS_USUARIO}.ordemServico_idOrdemServico = ${this._idOrdemServico} 
        AND ${TABLE_ORDEM_SERVICO_HAS_USUARIO}.Usuario_idUsuario = ${this._idUsuario};`,[values]);

        return this.parseInsertResponse(rows);
    }

    async updateTechnician() {
    const values = {
        excluded: 0,
        };
    
        const[rows] = await this._mysql.query(`UPDATE ordemServico_has_Usuario SET ?
        WHERE ordemServico_has_Usuario.ordemServico_idOrdemServico = ${this._idOrdemServico}
        AND ordemServico_has_Usuario.Usuario_idUsuario = ${this._idUsuario};`,[values]);
        
        return this.parseInsertResponse(rows);
    }

}