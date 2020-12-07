const { get } = require('lodash');
// const { post } = require('lodash');
const UserDao = require('../../../dao/cruds/UserDao');
const { ADMINISTRADOR_ID, MANUTENTOR_ID } = require('../../../../shared/constants/accessLevel');
const { STATUS_UNAUTHORIZED, MESSAGE_UNAUTHORIZED } = require('../../../../shared/constants/HTTPResponse');

module.exports = class InviteTechnician {
    getParameters(req) {
        return {
            idOrdemServico: get(req.body, idOrdemServico, ''),
            idUsuario: get(req.body, idUsuario, ''),
            excluded: get(req.body, excluded, ''),
            is_master: get(req.body, is_master, ''),
            Status_idStatus: get(req.body, Status_idStatus, ''),
            mysql: get(req, 'mysql'),
            authData: get(req, 'authData', ''),
        };
    }
    checkParameters({
        idOrdemServico,
        idUsuario,
        excluded,
        Status_idStatus,
        is_master,
        mysql,
        authData
    }) {
        return {
            ...(!idOrdemServico ? {idOrdemServico: 'idOrdem não informado'}: ''),
            ...(!idUsuario ? {idUsuario:'idUsuario não informado'}: ''),
            ...(!excluded ? {excluded: 'excluded não informado'}: ''),
            ...(!Status_idStatus ? {Status_idStatus: 'status não informado'}: ''),
            ...(!is_master ? {is_master: 'Não informado se e o manuitentor master da ordem': ''}),
            ...(!mysql ? {mysql: 'mysql conexao nao estabelecida'}: ''),
            ...(!authData ? {authData: 'authData nao encontrado'}: ''),
        };
    }
    async run(req) {
        try {
            const parameters = this.getParameters(req);
            const errors = this.checkParameters(parameters);
            if(Object.values(errors).length > 0);
        } catch (error) {
            
        }
    }
}
const { result } : any = await commitDataGet.run(queryGet);

if(result.length === undefined && result.excluded === 1 && event.body.user !== 3 && Status_idStatus === 5 && is_master === 1 ) {

    const queryUpdate = this.queryUpdate(data);
    const result2 = await commitDataUpdate.run(queryUpdate);
    return result2;
    
}else {
    // colocar um if e ul selse qui para uma segunda condiçao de inserçao so podemndo adm e manutentor
    if(event.body.user === 3) throw {
        status:404,
        err: 'usuario não autorizado'
    }
    const queryInsert = this.getQuery(data);
    const resulta = await commitData.run(queryInsert)
    return resulta; 
}