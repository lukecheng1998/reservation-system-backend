const { db } = require("../util/admin");

const { validateReservationData } = require("../util/validators");

exports.addEvent = (req, res) => {
  const addEventData = {
    attendants: req.body.attendants,
    endDate: req.body.endDate,
    event: req.body.event,
    location: req.body.location,
    startDate: req.body.startDate,
    email: req.body.email,
  };

  //console.log("about to validate errors")
  const { valid, errors } = validateReservationData(addEventData);
  //console.log("validated errors")
  if (!valid) {
    return res.status(400).json(errors);
  }
  //console.log("no errors about to write a new document")

  db.collection("events")
    .add(addEventData)
    .then((doc) => {
      const resEvent = addEventData;
      resEvent.eventId = doc.id;
      return res.json(resEvent);
    })
    .then(() => {
      return db
        .doc(`/events/${addEventData.email}`)
        .collection("attendants")
        .add({
          email: req.body.email,
          joined: new Date().toISOString(),
          event: req.body.event
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Unable to add event, please check your internet connection",
      });
      console.log(err);
    });
};
exports.getEvents = (res) => {
  db.collection("events")
    .orderBy("event", "asc")
    .get()
    .then((data) => {
      let events = [];
      data.forEach((doc) => {
        events.push({
          attendants: doc.data().attendants,
          endDate: doc.data().endDate,
          event: doc.data().event,
          location: doc.data().location,
          startDate: doc.data().startDate,
          email: doc.data().email,
        });
      });
      return res.json(events);
    })
    .catch((err) => console.error(err));
};
exports.addAttendant = (req, res) => {
  const newUser = {
    email: req.body.email,
    joined: new Date().toISOString(),
    event: req.body.event,
  };
  db.collection("events")
    .orderBy("event", "asc")
    .get()
    .then((data) => {
      let events = [];
      data.forEach((doc) => {
        events.push({
          attendants: doc.data().attendants,
          endDate: doc.data().endDate,
          event: doc.data().event,
          location: doc.data().location,
          startDate: doc.data().startDate,
          email: doc.data().email,
        });
        console.log(doc.data().event);
        console.log(newUser.event);
        if (doc.data().event === newUser.event) {
          db.doc(`/events/${doc.id}`)
            .collection('attendants')
            .doc(newUser.email)
            .set(newUser)
        }
      });
      return res.json({message: "Added you to the event!"});
    })
    .catch((err) => console.error(err));
};
