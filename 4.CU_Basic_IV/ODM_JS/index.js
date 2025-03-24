
import mongoose from 'mongoose';
import {getdata} from './api.js';
const { Schema, model } = mongoose;
let uri = 'mongodb://localhost:27017/uni_2023_v2';
//trayendo la data del api
const query = await getdata().then(data=> {
  //console.log(data);
  return data;
}).catch(error => {
  console.log('no va');
  process.exit(0);
});
//console.log(query);
 // conectando a la bd
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
    err => { console.log('no se ha podido conectar');
    process.exit(0);
  });

// definiendo schemas y modelos en mongoose

const advisorSchema = new mongoose.Schema({
   s_ID: {type:String},
   i_ID: {type:String}
});
const classroomSchema = new mongoose.Schema({
building:{type:String},
room_number:{type:String},
capacity:{type:Number}
});
const programsSchema= new mongoose.Schema({
  socialMediaHandles: {
    type: Map,
    of: String
  }
})

const courseSchema = new mongoose.Schema({
  course_id:{type:String},
  title:{type:String},
  dept_name:{type:String},
  credits:{type:Number},
  programs:{type:String},
  programs_1:[{type:String}]
  });
  
  const departmentSchema = new mongoose.Schema({
    dept_name:{type:String},
    building:{type:String},
    budget:{type:mongoose.Types.Decimal128},
    });
  const instructorSchema = new mongoose.Schema({
    ID:{type:String},
    name:{type:String},
    dept_name:{type:String},
    salary:{type:mongoose.Types.Decimal128},
    activo:Boolean,
    phone_extensions:[String]
    });

    const prereqSchema = new mongoose.Schema({
      course_id:{type:String},
      prereq_id:{type:String},
      });
    const sectionSchema = new mongoose.Schema({
      course_id:{type:String},
      sec_id:{type:String},
      semester:{type:String},
      year:{type:mongoose.Types.Decimal128},
      building:{type:String},
      room_number:{type:String},
      time_slot_id:{type:String}
      });
      const studentSchema = new mongoose.Schema({
        ID:{type:String},
        name:{type:String},
        dept_name:{type:String},
        credits:{type:mongoose.Types.Decimal128},
        picture:Buffer,
        grades:[String]
        });
      const takesSchema = new mongoose.Schema({
        course_id:{type:String},
        sec_id:{type:String},
        semester:{type:String},
        year:{type:mongoose.Types.Decimal128},
        grade:{type:String},
        update: {type: Date, default: Date.now}
        });
        const teachesSchema = new mongoose.Schema({
          ID:{type:String},
          course_id:{type:String},
          sec_id:{type:String},
          semester:{type:String},
          year: {type:mongoose.Types.Decimal128},
          update: {type: Date, default: Date.now}
          });



let advisor =new mongoose.model('advisor', advisorSchema);
let classroom =new mongoose.model('classroom', classroomSchema);
let course =new mongoose.model('course', courseSchema);
let department =new mongoose.model('department', departmentSchema);
let instructor =new mongoose.model('instructor', instructorSchema);
let prereq =new mongoose.model('prereq', prereqSchema);
let section =new mongoose.model('section', sectionSchema);
let student =new mongoose.model('student', studentSchema);
let takes =new mongoose.model('takes', takesSchema);
let teaches =new mongoose.model('teaches', teachesSchema);


console.log(query.course);
try {
 let inserted_a = await advisor.insertMany(query.advisor);
 let inserted_b = await classroom.insertMany(query.classroom);
 let inserted_c = await course.insertMany(query.course);
 let inserted_d = await department.insertMany(query.department);
 let inserted_e = await instructor.insertMany(query.instructor);
 let inserted_f = await prereq.insertMany(query.prereq);
 let inserted_g = await section.insertMany(query.section);
 let inserted_h = await student.insertMany(query.student);
 let inserted_i = await takes.insertMany(query.takes);
 let inserted_j = await teaches.insertMany(query.teaches);
 //console.log(inserted_a);
 process.exit(0);
} catch (e) {
 console.log('Some error');
 console.log(e);
 process.exit(0);
}


