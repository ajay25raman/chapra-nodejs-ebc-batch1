
const express = require("express");

const app = express();
const PORT = 3000;

// Static Array
const users = [
    { id: 1, name: "Raman", email: "raman@gmail.com", city: "Chapra", age: 24, status: "active" },
    { id: 2, name: "Ajay", email: "ajay@gmail.com", city: "Patna", age: 25, status: "active" },
    { id: 3, name: "Rahul", email: "rahul@gmail.com", city: "Siwan", age: 23, status: "inactive" },
    { id: 4, name: "Amit", email: "amit@gmail.com", city: "Chapra", age: 26, status: "active" },
    { id: 5, name: "Priya", email: "priya@gmail.com", city: "Patna", age: 22, status: "inactive" }
];

// 1. GET all users
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// 2. GET user by ID (Route Parameter)
app.get("/users/id/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

// 3. GET user by name
app.get("/users/name/:name", (req, res) => {
    const name = req.params.name.toLowerCase();

    const result = users.filter(
        (u) => u.name.toLowerCase() === name
    );

    res.status(200).json(result);
});

// 4. GET user by email
app.get("/users/email/:email", (req, res) => {
    const email = req.params.email.toLowerCase();

    const user = users.find(
        (u) => u.email.toLowerCase() === email
    );

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

// 5. GET users by city
app.get("/users/city/:city", (req, res) => {
    const city = req.params.city.toLowerCase();

    const result = users.filter(
        (u) => u.city.toLowerCase() === city
    );

    res.status(200).json(result);
});

// 6. GET users by status
app.get("/users/status/:status", (req, res) => {
    const status = req.params.status.toLowerCase();

    if (!["active", "inactive"].includes(status)) {
        return res.status(400).json({
            message: "Status must be active or inactive"
        });
    }

    const result = users.filter(
        (u) => u.status === status
    );

    res.status(200).json(result);
});

// 7. Search users (Query Parameter)
app.get("/users/search", (req, res) => {
    const search = (req.query.name || "").toLowerCase();

    if (!search) {
        return res.status(400).json({
            message: "Please provide name query"
        });
    }

    const result = users.filter(
        (u) => u.name.toLowerCase().includes(search)
    );

    res.status(200).json(result);
});

// 8. Filter users by city and status
app.get("/users/filter", (req, res) => {
    const { city, status } = req.query;

    let result = [...users];

    if (city) {
        result = result.filter(
            (u) => u.city.toLowerCase() === city.toLowerCase()
        );
    }

    if (status) {
        result = result.filter(
            (u) => u.status === status.toLowerCase()
        );
    }

    res.status(200).json(result);
});

// 9. Sort users by age
app.get("/users/sort", (req, res) => {
    const order = req.query.order || "asc";

    if (!["asc", "desc"].includes(order)) {
        return res.status(400).json({
            message: "Order must be asc or desc"
        });
    }

    const result = [...users].sort((a, b) =>
        order === "asc" ? a.age - b.age : b.age - a.age
    );

    res.status(200).json(result);
});

// 10. Pagination and limit
app.get("/users/page", (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;

    if (
        !Number.isInteger(page) ||
        !Number.isInteger(limit) ||
        page < 1 ||
        limit < 1
    ) {
        return res.status(400).json({
            message: "Page and limit must be positive integers"
        });
    }

    const startIndex = (page - 1) * limit;
    const result = users.slice(startIndex, startIndex + limit);

    res.status(200).json({
        page,
        limit,
        totalUsers: users.length,
        totalPages: Math.ceil(users.length / limit),
        data: result
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
