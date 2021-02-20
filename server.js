//express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//views
const homepage = path.join(__dirname, "..", "public/index.html");

//logger
const morgan = require("morgan");
app.use(morgan("dev"));

//parsing requests
app.use(require("body-parser").json());
app.use(express.urlencoded({ extended: false }));

//client side static
app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.static("public"));

//routes
app.get("/", async (req, res) => {
    try {
        await res.sendFile(homepage);
    } catch (err) {
        console.log(err);
    }
});

app.use("", async (err, req, res, next) => {
    if (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`);
});
