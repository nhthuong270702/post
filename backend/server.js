const express = require("express");
const bodyParser = require("body-parser");


const app = express();
var cors = require('cors')

app.use(cors())

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// a route for home page
app.get("/home", (req, res) => {
    res.json({ message: "NodeJs CRUD Application" });
});

require("./routes/post.route")(app);


app.listen(4000, () => {
    console.log("Server is running on port 4000.");
});