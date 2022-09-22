import mysql from 'mysql';

var conectar = mysql.createConnection({
    host: 'localhost',
    user: 'supervisor',
    password: 'mainselotrop1226',
    database: 'parcial_2',
    typeCast: function castField(field, useDefaultTypeCasting) {
        if (field.type === "BIT" && field.length === 1) {
            let bytes = field.buffer();
            return bytes[0] === 1;
        }
        return useDefaultTypeCasting();
    }
});

conectar.connect(function(err) {
    if (err) {
        console.log("Error en la conexion:"+err.stack);
        return;
    } else {
        console.log('Conexion Exitosa ID: ' + conectar.threadId);
    }
});
export {conectar};