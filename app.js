const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const converter = require('./public/converter');

app.use(morgan('common'))

app.use(express.static('./public'))

app.use(bodyParser.urlencoded({extended: false}))

// Creating a connection to mysql database
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'IKEA-Trådfri'
    });
};

app.get("/devices", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get("/api/devices", (req, res) => {

    const connection = getConnection()

    const lightbulbId = req.params.id
    const queryString = "SELECT * FROM lightbulbs"
    connection.query(queryString, [lightbulbId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for lightbulbs: " + err)
            res.sendStatus(500)
            return
        }
        console.log('We fetched data successfully')
        res.json(rows)
    });
});

app.get('/api/devices/:id', (req, res) => {
    const connection = getConnection()

    const lightbulbId = req.params.id
    const queryString = "SELECT * FROM lightbulbs WHERE lightbulb_id = ?"
    connection.query(queryString, [lightbulbId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for specific lightbulb" + err)
            res.sendStatus(500)
            return
        }
        console.log('We fetched the lightbulb sccessfully')
        res.json(rows)
    });
});

app.get('/api/new_lightbulb', (req, res) => {
    console.log("Creating a new lightbulb")
    res.sendFile(path.join(__dirname + '/public/form.html'))
});

app.post('/api/lightbulb_create', (req, res) => {
    console.log("Trying to create a new user...")
    const lightbulbStatus = req.body.create_lightbulb_status
    const lightbulbNominal = req.body.create_lightbulb_nominal_consume
    const lightbulbActual = req.body.create_lightbulb_actual_consume
    const lightbulbIntensity = req.body.create_lightbulb_intensity
    const lightbulbColor = req.body.create_lightbulb_color
    const lightbulbHardware = req.body.create_lightbulb_hardware_typenumber
    const lightbulbVersion = req.body.create_lightbulb_version

    const queryString = "INSERT INTO lightbulbs (lightbulb_status, lightbulb_nominal_consume, lightbulb_actual_consume, lightbulb_intensity, lightbulb_color, lightbulb_hardware_typenumber, lightbulb_software_version) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [lightbulbStatus, lightbulbNominal, lightbulbActual, lightbulbIntensity, lightbulbColor, lightbulbHardware, lightbulbVersion], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertedId)
        res.end()
    });
});

app.listen(3000, () => {
    console.log("Server is up and listening on port 3000")
});