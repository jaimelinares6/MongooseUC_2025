
import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://localhost:27017/NOMBRE_BD EN COMPASS';

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

const NOMBRECARPETA1Schema = new mongoose.Schema({
  NOMBRECARPETA1_mongodb: { 
    NOMBREDATO: { type: TIPODEDATO },
    //capacity: { type: Number },
    //room_number: { type: String }  // Puede ser String si viene con comillas
  }
});

const NOMBRECARPETA2Schema = new mongoose.Schema({
  NOMBRECARPETA2: [{ 
    NOMBRECARPETA1_mongodb: { 
      NOMBREDATO: { type: TIPODEDATO },
      //capacity: { type: Number },
      //room_number: { type: Number } // Si room_number puede contener caracteres no numéricos
    }
  }]
});
// Modelos

let NOMBRECARPETA1Mdb = mongoose.model('NOMBRECARPETA1', NOMBRECARPETA1Schema);
let NOMBRECARPETA2 = mongoose.model('NOMBRECARPETA2', NOMBRECARPETA2Schema);

// Función principal


async function main() {
  //trayendo la data del api
	const query = await getdata().then(data => {
    // Darse cuenta que el objeto NOMBRECARPETA2 viene en string y por tanto hay que parsearlo
    data.NOMBRECARPETA2 = data.NOMBRECARPETA2.map(item => {
      try {
        return {
          //uso esta línea para parsear el NOMBRECARPETA2
          NOMBRECARPETA1_mongodb: NOMBRECARPETA2.parse(item.NOMBRECARPETA1_mongodb)
        };
      } catch (error) {
        console.error('Error parseando NOMBRECARPETA2:', error, 'Datos:', item);
        return null; // Evita agregar datos incorrectos
      }
    }).filter(item => item !== null); // Elimina elementos mal formateados
    
    return data;
  }).catch(error => {
    console.log('no va');
    process.exit(0);
  });
  
	console.log(query);
  try {
    // Inserción de datos en MongoDB
    console.log('main',query.NOMBRECARPETA2)
    await NOMBRECARPETA1Mdb.insertMany(query.NOMBRECARPETA2);
    // Esta línea se utiliza para cuando tengas que trabajar con NOMBRECARPETA2s anidados
    await NOMBRECARPETA2.create({NOMBRECARPETA2: query.NOMBRECARPETA2});
    console.log('Datos insertados correctamente');
    process.exit(0);
  } catch (e) {
    console.error('Error en la inserción o agregaciones:', e);
    process.exit(0);
  }
}

// Ejecutar el script
main();


