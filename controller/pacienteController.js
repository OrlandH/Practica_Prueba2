const paciente = require('../schema/paciente')
const listarPacientes = async (req,res)=>{
    const pacientes = await paciente.find({idUser}).where(ciudad,'Quito')
    res.status(200).json(pacientes)
}

module.exports = listarPacientes;