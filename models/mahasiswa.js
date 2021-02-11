const mongoose = require('mongoose')
const uri= process.env.MONGODB_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false, useCreateIndex: true }).then(result => {
    console.log('Connected to MongoDB')
  }).catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
})


const mahasiswaSchema = new mongoose.Schema({
    Nama : {type: String, requires : true},
    NIM : {type: String, required : true, unique : true},
    Jurusan : {type: String}
}, { collection : 'mahasiswa' })

mahasiswaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
})

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema)