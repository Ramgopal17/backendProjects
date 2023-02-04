const db = require("../model")
const Booking = db.booking
const {validMobNum,validName}=require("../validation/validation")



const isValid = function (value) {   //function to check entered data is valid or not
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
}
let mobileRegex = /^[7-9][0-9]{9}$/
let nameRegex = /^[a-zA-Z ]+$/
exports.bookAmbulance = async function (req, res) {
  try {

    let data = req.body
    const { name, pickUpLocation, dropLocation, vehicleType, phone, scheduleTime } = data
    if (isValid(name)) {
      return res.status(400).send({ status: false, message: "please enter name in correct format" })
    }
    if (!validName(name)) {
      return res.status(400).send({ status: false, message: "please enter start date" })
    }

    if (!isValid(pickUpLocation)) {
      return res.status(400).send({ status: false, message: "please enter pick up location" })
    }
    if (!isValid(dropLocation)) {
      return res.status(400).send({ status: false, message: "please enter drop location" })
    }
    if (!isValid(vehicleType)) {
      return res.status(400).send({ status: false, message: "please enter vehicle type you want to book" })
    }

    if (!isValid(phone)) {
      return res.status(400).send({ status: false, message: "please enter your mobile number" })

    }
    if (!validMobNum(phone)) {
      return res.status(400).send({ status: false, message: "please enter indian mobile number" })
    }
   
    if (!isValid(scheduleTime)) {
      return res.status(400).send({ status: false, message: "please enter scheduled time" })
    }
    if (!["Book now", "Book later"].includes(scheduleTime)) {
      return res.status(400).send({ status: false, message: "please enter Book Now/Book later only" })

    }
    let bookings = await Booking.create(data)
    res.status(201).send({
      message: 'Booking created successfully', booking: bookings
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

