require('dotenv').config()
const express = require('express')
const app = express()
const Mahasiswa = require('./models/mahasiswa')
const cors = require('cors')


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

//Daftar API

app.get('/api/v1/mahasiswa', (request, response) => {
    Mahasiswa.find({}).then(all_mahasiswa => {
        response.json(all_mahasiswa)
    })
})
/*
app.get('/api/v1/mahasiswa/:id', (request, response) => {
    Mahasiswa.findById(request.params.id).then(mahasiswa => {
        if(mahasiswa) response.json(mahasiswa)
        else response.status(404).end()
    })
})
*/
app.get('/api/v1/mahasiswa/search', (request, response) => {
    //console.log(request.query)
    if(request.query.q === ''){
        response.json([])
    }
    Mahasiswa.find({$or : [{"Nama" : {"$regex": request.query.q, "$options": "$i"}}, {"NIM": {"$regex": request.query.q, "$options": "$i"}}]}).then(
        mahasiswa => {
            if(mahasiswa) response.json(mahasiswa)
            else response.status(404).end()
        }
    ).catch(() => response.status(404).end()) 
   // response.status(404).end()
})

const PORT  = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})