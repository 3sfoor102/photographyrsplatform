const Booking = require("../models/booking");

const newBookingForm = (req, res) => {
    res.render('new.ejs')
}

const createBooking = async (req, res) =>{
    const bookingData = {}
    bookingData.name = req.body.name
    bookingData.email = req.body.email
    bookingData.phoneNumber = req.body.phoneNumber
    bookingData.date = req.body.date
    bookingData.package = req.body.package

    await Booking.create(bookingData)
    res.send('Booked!')

}

const index = async(req, res)=>{
    let allBookings = await Booking.find()
    res.render('index.ejs', {
        allBookings: allBookings
    } )
} 

const show = async(req, res) =>{
    let showBooking = await Booking.findById(req.params.bookingId)
    res.render('show.ejs', {
        showBooking: showBooking
    })
}

const edit = async(req,res)=>{
    let bookingToEdit = await Booking.findById(req.params.bookingId)
    res.render('edit.ejs', {
        bookingToEdit: bookingToEdit
    })
}

const update = async(req, res)=>{
    const bookingData = {}
    bookingData.name = req.body.name
    bookingData.email = req.body.email
    bookingData.phoneNumber = req.body.phoneNumber
    bookingData.date = req.body.date
    bookingData.package = req.body.package
    
    await Booking.findByIdAndUpdate(req.params.bookingId, bookingData, {new: true} )
    res.redirect(`/bookings/${req.params.bookingId}`)
}

module.exports = {
newBookingForm, createBooking, index, show, update, edit,
};
