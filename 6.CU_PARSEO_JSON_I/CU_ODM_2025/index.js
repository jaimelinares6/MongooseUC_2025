
import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://localhost:27017/uni_2025_ejercicio_4';

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

const objectSchema = new mongoose.Schema({
  object_mongodb: { 
    building: { type: String },
    capacity: { type: Number },
    room_number: { type: String }  // Puede ser String si viene con comillas
  }
});

const jsonSchema = new mongoose.Schema({
  json: [{ 
    object_mongodb: { 
      building: { type: String },
      capacity: { type: Number },
      room_number: { type: Number } // Si room_number puede contener caracteres no numéricos
    }
  }]
});
// Modelos

let ObjectMdb = mongoose.model('Object', objectSchema);
let Json = mongoose.model('Json', jsonSchema);

// Función principal


async function main() {
  //trayendo la data del api
	const query = await getdata().then(data => {
    // Darse cuenta que el objeto json viene en string y por tanto hay que parsearlo
    data.json = data.json.map(item => {
      try {
        return {
          //uso esta línea para parsear el json
          object_mongodb: JSON.parse(item.object_mongodb)
        };
      } catch (error) {
        console.error('Error parseando JSON:', error, 'Datos:', item);
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
    console.log('main',query.json)
    await ObjectMdb.insertMany(query.json);
    // Esta línea se utiliza para cuando tengas que trabajar con jsons anidados
    await Json.create({json: query.json});
    console.log('Datos insertados correctamente');
    process.exit(0);
  } catch (e) {
    console.error('Error en la inserción o agregaciones:', e);
    process.exit(0);
  }
}

// Ejecutar el script
main();


