import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://127.0.0.1:27017/ec2024';
//trayendo la data del api
const query = await getdata().then(data=> {
   console.log(data);
   return data;
 }).catch(error => {
   console.log('no va');
   process.exit(0);
 });

const options = {
   autoIndex: false, // Don't build indexes
   maxPoolSize: 10, // Maintain up to 10 socket connections
   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
   family: 4 // Use IPv4, skip trying IPv6
 };
  mongoose.connect(uri, options).then(
   () => { console.log('se ha conectado exitosamente')
      },
   err => { console.log('no se ha podido conectar') }
   );
   /*Agregue un campo enum que contemple el estatus de la matrícula. Dicho status puede ser:
   1.No matriculado
   2.En proceso
   3.Matriculado
   4.Otro*/
   /*Agregue un array matricula compuesto por:
1. Primera
2.Segunda
3. Tercera*/
/*Agregue un esquema "alumno" que contenga:
1. Un id númerico agregado por el alumno con el número que prefiera
2. Un campo name con el valor de su nombre,
3.Un campo last_name con el valor de su apellido
4.Un campo dni alphanumérico con el valor de su dni*/
   let registro={alumno:[{
	   s_id:9,
	   name:'ljavier',
	   last_name:'hdez',
	   dni:'3456753690R'
   }]
   };
   const alumnoSchema = new mongoose.Schema({
	  id:{type:Number},
      name:{type:String},
      last_name:{type:String},
      dni:{type:String}  	  
   });
   const matriculaSchema = new mongoose.Schema({
      ID:{type:Number},
      name:{type:String},
	  tot_cred:{type:Number},
	  course_id:{type:String},
	  matricula:['1era','2da','3ra','4ta'],
	  status:{
        type: String,
        enum : ['No matriculado','En Proceso','Matriculado','Otro'],
        default: 'Matriculado'
			},
	  semester:{type:String},
	  year:{type: Date, default: Date.now},
	  grade:{type:String}
   });
   const departmentSchema = new mongoose.Schema({
				  dept_name:{type:String},
				  building:{type:String},
				  budget:{type:mongoose.Types.Decimal128}
                 });
   
  
   let matricula =new mongoose.model('matricula', matriculaSchema);
   let department =new mongoose.model('department', departmentSchema);
   let alumno =new mongoose.model('alumno', alumnoSchema);
   try {
	 let inserted_a = await matricula.insertMany(query.matricula);
	 let inserted_b = await department.insertMany(query.department);
	 let inserted_c = await alumno.insertMany(registro.alumno);
	 //console.log(inserted_a);
	 process.exit(0);
	} catch (e) {
	 console.log('Some error');
	 console.log(e);
	 process.exit(0);
	}
   