
require('./global');
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const trackerRouter = require('./routes/tracker');
const reportRoutee = require('./routes/report');
const { authRouter } = require('./routes/auth');
const { userRouter } = require('./routes/user');
const authenticate = require('./middleware/auth')

const port = 3001
const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
app.use("/auth", authRouter);
app.use("/tracker", authenticate, trackerRouter);
app.use("/report", authenticate, reportRoutee);
app.use("/user", authenticate, userRouter);

app.listen((port), () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (error) {
        if (error) {
            console.log("Error!" + error);
        }
    });
    console.log("Server is Running @", port);
})