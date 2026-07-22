const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const authCtrl = require("./controllers/auth.js");
const bookingCtrl = require("./controllers/booking-controller.js");
const questionCtrl = require("./controllers/questions-controller.js");
const galleryCtrl = require("./controllers/gallery-controller.js");


const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const methodOverride = require("method-override");
const { MongoStore } = require("connect-mongo");
const upload = require("./config/multer");
const session = require("express-session");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");


const app = express();

const PORT = process.env.PORT || 3000; // For me, this is best practice. Usually, the port is placed in .env; if not, 3000 will be used

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(passUserToView);

app.get("/", authCtrl.home);
app.get("/auth/sign-up", authCtrl.showSignUpForm);
app.post("/auth/sign-up", authCtrl.signUp);
app.get("/auth/sign-in", authCtrl.showSignInForm);
app.post("/auth/sign-in", authCtrl.signIn);
app.delete("/auth/sign-out", authCtrl.signOut);

app.get("/reviews", isSignedIn, authCtrl.dashboard);

// BOOKING ROUTES
app.get('/bookings/new', isSignedIn, bookingCtrl.newBookingForm)
app.post('/booking', isSignedIn, bookingCtrl.createBooking)
app.get('/bookings', bookingCtrl.index)
app.get('/bookings/:bookingId', bookingCtrl.show )
app.get('/bookings/:bookingId/edit', bookingCtrl.edit)
app.put('/bookings/:bookingId', bookingCtrl.update)
app.delete('/bookings/:bookingId', bookingCtrl.deleteBooking)


// QUESTIONS ROUTES
app.get('/questions/new', isSignedIn, questionCtrl.questionIndex)
app.post('/questions/', isSignedIn, questionCtrl.create)
app.get('/questions', isSignedIn, questionCtrl.questionIndex)
app.get('/questions/:questionId', isSignedIn, questionCtrl.showQuestion)


// app.delete('/listings/:listingId', isSignedIn, listingsCtrl.deleteListing)

// GALLERY ROUTES
app.get('/gallery', isSignedIn, galleryCtrl.showGallery, galleryCtrl.GalleryRandomImages)


app.get('/*splat', (req, res)=>{
    res.render('error.ejs', {
        msg:404

    })
})



const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

startServer();
