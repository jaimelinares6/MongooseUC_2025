
import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://localhost:27017/uni_2025_ejercicio_3';

// Conectando a MongoDB
const options = {
  autoIndex: true, // Habilita índices automáticos
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

mongoose.connect(uri, options)
  .then(() => console.log('Conectado exitosamente a MongoDB'))
  .catch(err => {
    console.error('No se ha podido conectar a MongoDB', err);
    process.exit(0);
  });

// Definiendo schemas y modelos en Mongoose
const courseSchema = new mongoose.Schema({
  course_id: { type: String, index: true },
  title: { type: String },
  dept_name: { type: String },
  credits: { type: Number },
  programs: { type: String },
  programs_1: [{ type: String }]
});

const takesSchema = new mongoose.Schema({
  course_id: { type: String, index: true },
  sec_id: { type: String },
  semester: { type: String },
  year: { type: mongoose.Types.Decimal128 },
  grade: { type: String },
  update: { type: Date, default: Date.now }
});

// Índice compuesto en takes para optimizar consultas por curso y año
takesSchema.index({ course_id: 1, year: -1 });

const credsumSchema = new mongoose.Schema({
  'SUM(credits)': { type: String, required: true }
});


// Modelos
let Course = mongoose.model('Course', courseSchema);
let Takes = mongoose.model('Takes', takesSchema);
let CredSum = mongoose.model('CredSum', credsumSchema);

// Agregaciones

let CoursesByDept = mongoose.model('CoursesByDept', new mongoose.Schema({ _id: String, totalCursos: Number }));
let CoursesPerYear = mongoose.model('CoursesPerYear', new mongoose.Schema({ _id: mongoose.Types.Decimal128, totalCursos: Number }));

// Función principal
async function main() {
  //trayendo la data del api
	const query = await getdata().then(data=> {
	  //console.log(data);
	  return data;
	}).catch(error => {
	  console.log('no va');
	  process.exit(0);
	});
	//console.log(query);
  
  try {
    // Inserción de datos en MongoDB
    await Course.insertMany(query.course);
    await Takes.insertMany(query.takes);
    await CredSum.insertMany(query.credit_sum);

    console.log('Datos insertados correctamente');

    // Agregaciones en MongoDB

    // 1. Obtener cursos de 4 créditos agrupados por departamento
    const coursesByDept = await Course.aggregate([
      { $match: { credits: 4 } },
      { $group: { _id: "$dept_name", totalCursos: { $sum: 1 } } },
      { $sort: { totalCursos: -1 } }
    ]);
    console.log('Cursos de 4 créditos por departamento:', coursesByDept);

	// Guardar resultados en MongoDB
    await Promise.all(coursesByDept.map(async (doc) => {
      await CoursesByDept.updateOne({ _id: doc._id }, { $set: { totalCursos: doc.totalCursos } }, { upsert: true });
    }));

    console.log('Cursos de 4 créditos por departamento insertados en Compass');
    // 2. Contar el número de cursos tomados por año
    const coursesPerYear = await Takes.aggregate([
      { $group: { _id: "$year", totalCursos: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    console.log('Número de cursos tomados por año:', coursesPerYear);
	 // Guardar resultados en MongoDB
    await Promise.all(coursesPerYear.map(async (doc) => {
      await CoursesPerYear.updateOne({ _id: doc._id }, { $set: { totalCursos: doc.totalCursos } }, { upsert: true });
    }));

    process.exit(0);
  } catch (e) {
    console.error('Error en la inserción o agregaciones:', e);
    process.exit(0);
  }
}

// Ejecutar el script
main();


