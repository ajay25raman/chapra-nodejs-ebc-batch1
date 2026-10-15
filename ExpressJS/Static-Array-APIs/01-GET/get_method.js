const express = require('express');

const server = express();

/// Post, Body, Put, Patch
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


server.get('/', (request, response) => {
    response.json(users);
});
// Params
server.get('/users/:name', (request, response) => {
    response.json(`userName : ${request.params.name}`);
});

/// Body
server.get('/users', (request, response) => {

    response.json(`Name : ${request.body.name}, Address :${request.body.address}`);
});



server.get('/users/name/:name', (request, response) => {
    const name = request.params.name;

    const user = users.find(
        (u) => u.name.toLowerCase() === name.toLowerCase()
    );

    if (!user) {
        return response.status(404).json({
            message: "User nahi mil raha "
        });
    }

    response.json(user);
});

// Server start
server.listen(3000, () => {
    console.log("Server is Running at http://localhost:3000");
});


/// Params 
///
