const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.send("Successful request!");
})

const port = 3001;
app.listen(port, () => console.log("FDMployee backend is listening on port " + port));
