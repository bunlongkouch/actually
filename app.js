const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON

let users = []; // Temporary storage for users

// 1. Registration Service (POST)
app.post('/register', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send({ message: "User registered successfully", user });
});

// 2. Login Service (POST)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.send({ message: "Login successful", user });
    } else {
        res.status(401).send({ message: "Invalid credentials" });
    }
});

// 3. Search User Service (GET)
app.get('/users', (req, res) => {
    res.send(users);
});

// 4. Update Profile Service (PUT)
app.put('/update/:email', (req, res) => {
    const { email } = req.params;
    const updatedData = req.body;
    let user = users.find(u => u.email === email);
    if (user) {
        Object.assign(user, updatedData);
        res.send({ message: "User updated successfully", user });
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

// 5. Delete User Service (DELETE)
app.delete('/delete/:email', (req, res) => {
    const { email } = req.params;
    users = users.filter(u => u.email !== email);
    res.send({ message: "User deleted successfully" });
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
