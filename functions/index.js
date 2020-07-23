const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
const cors = require("cors");
app.use(cors());
const { db } = require("./util/admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const { signup, login } = require("./handlers/users");
const {
  addEvent,
  getEvents,
  addAttendant,
} = require("./handlers/reservations");
app.post("/event", addEvent);
app.post("/login", login);
app.post("/signup", signup);
app.get("/event", getEvents);
app.post("/attendant", addAttendant);
exports.api = functions.https.onRequest(app);
