//CA1 Back-end Web Development
//21913 Taiane Vieira da Silva

//declarations and imports
const express = require('express')
const bodyParser = require('body-parser') //using body Parser
const app = express() //to ocntrol the request
const port = 3000 //localhost testing
const Transports = require('./transports.js') // name of the class
const mongoose = require('mongoose')

// app plugins or lib
app.use(bodyParser.urlencoded({ extended: false })) // to get our first post

//API ROUTES
//show Transports from database created - to get all your objects
app.get('/transports', (req, res) => {
    Transports.find((err, transports) => {
        if (err) { //in case of error the message will appear
            res.send("Error occured no vehicle retrieved.")
            return
        } // if not error the list of trnasports will appear
        res.send(transports)
        console.log(transports)
    })

    console.log("The database is progress!")

})

//get request and a parameter from database by id
app.get('/transports/:id', (req, res) => {
    const id = req.params.id;  // details from mongoosejs

    Transports.findById(id, (err, transport) => {

        if (err) { //in case of error the message will appear
            res.send("Vehicle not found!")

        }  // if not error the list of ids
        res.send(transport)
        console.log(transport)
    })

})

//add vehicles in the database using post
app.post('/transports', (req, res) => {

    //insert using post
    console.log('Inserting a vehicle in the database.');

    let workingday = false;
    if (req.body.workingday === 'false') {  // boolean
        workingday = true;
    }

    let transport = new Transports({
        capacity: parseInt(req.body.capacity), // Number of people allowed
        colour: req.body.colour, //colour of the vehicle  // string
        model: req.body.model, // model of vehicle        // string
        speed: req.body.speed, // max speed             //string
        workingday: workingday // if vehicle is available    // boolean
    });
    transport.save(err => {
        if (err) { //if the input is not found it will appear a error
            res.send('Vehicle not inserted into the database')
        }
    }) //if the input is found it will appear 

    res.send("Inserting vehicle into the database...")
    console.log("Vehicle successfully inserted!")
    retun;
})


// put is to edit,modify,change the database 
app.put('/transports/:id', (req, res) => {
    
    console.log("Editing the vehicles details...")
    Transports.findByIdAndUpdate(
        req.params.id, {
        capacity: parseInt(req.body.capacity),
        colour: req.body.colour,
        model: req.body.model,
        speed: req.body.speed,
        workingday: req.body.workingday
    }, err => {
        if (err) {
            res.send("Vehicle was not edited.")
            return;
        }
        res.send("Data sucessfully edited!")
    })

})
// to delet  1 object using parameter and delete by id
app.delete('/transports/:id', (req, res) => {
    Transports.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.send("Vehicle was not deleted.")
            return
        }
        res.send("Data successfully deleted!")
        console.log(`Vehicle with id ${req.params.id} was deleted`)

    })

})
//Start the server
app.listen(port, () => {
    mongoose.connect('mongodb+srv://admin:admin@transportsapi.c9ufa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
        catch(error => handleError(error));
    console.log(`Example app listening at http://localhost:${port}`)
})