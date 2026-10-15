const express = require('express');
const server = express();
server.use(express.json());
const users = [
    {
        id: 1,
        name: "Raman",
        address: "Amnour"
    },
    {
        id: 2,
        name: "Ram",
        address: "Amnour"
    },
    {
        id: 3,
        name: "Gopal Kumar",
        address: "Chapra"
    }
];
const PORT = 4000;

server.post('/users', (request, response) => {

    const body = request.body;

    const newUser = {
        "id": users.length + 1,
        "name": body.name,
        "address": body.address
    }
    users.push(newUser);

    response.status(201).json({
        message: "New User Added Successfully.",
        "newUser": newUser
    })
})

server.listen(PORT, () => {
    console.log("Server is Running on " + PORT)
})


