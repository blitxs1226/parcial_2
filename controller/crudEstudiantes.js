import {conectar} from "../model/db_conectar.js";

var crud_estudiantes=({});

crud_estudiantes.leer=function(req,res){
    conectar.query('SELECT id_estudiante,Carne,nombres,apellidos,direccion,telefono,genero,email,date_format(fecha_nacimiento,"%Y-%m-%d") as fecha_nacimiento FROM estudiante;',function(err,result){
        if(err){
            throw err;
        }else{
           res.render('estudiantes/index',{
                        resultado:result
                    });  
        }
    });
}

crud_estudiantes.crud=function(req,res){
    const btn_agregar = req.body.btn_agregar;
    const btn_modificar = req.body.btn_modificar;
    const btn_eliminar = req.body.btn_eliminar;
    const id = req.body.txt_id;
    const carne = req.body.txt_carne;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const correo_electronico = req.body.txt_email;
    const fecha_nacimiento = req.body.txt_fecha_nacimiento;
    var genero = req.body.txt_genero;
    if(genero==0){
        genero=false;
    }
    else{
        genero=true;
    }
    if(btn_agregar){
        conectar.query('insert into estudiante SET ?',{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,email:correo_electronico,fecha_nacimiento:fecha_nacimiento,genero:genero},(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        }
        );
    }
    if(btn_modificar){
        conectar.query('update estudiante SET ? WHERE id_estudiante=?',[{carne:carne,nombres:nombres,apellidos:apellidos,direccion:direccion,telefono:telefono,email:correo_electronico,fecha_nacimiento:fecha_nacimiento,genero:genero},id],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        }
        );
    }
    if(btn_eliminar){
        conectar.query('delete from estudiante WHERE id_estudiante=?',id,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        }
        );
    }

};

export {crud_estudiantes}