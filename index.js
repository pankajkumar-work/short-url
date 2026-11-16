const express = require("express");
const { connectToMonagoDB } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8002;

connectToMonagoDB("mongodb://localhost:27017/short-url")
.then( () => console.log("MongoDB Connected!"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate( {
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    },
} 
)
res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));