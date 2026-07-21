const Booking = require("../models/booking");
const User = require("../models/user");

const newBookingForm = (req, res) => {
    res.render('new.ejs')
}

const createBooking = async (req, res) =>{
    const bookingData = {}
    const originalDate = req.body.date
    const date = new Date(originalDate)
    let user = await User.findById(req.session.user.id)
    if (user.points <=100) {
    user.points = user.points + 10
    await user.save()
    }
    //  else {
    //     let UserHasFreeSession = false
    // }
 
    bookingData.name = req.body.name
    bookingData.email = req.body.email
    bookingData.phoneNumber = req.body.phoneNumber
    bookingData.date = req.body.date
    bookingData.package = req.body.package
    bookingData.userId = req.session.user.id

await Booking.create(bookingData);

const allBookings = await Booking.find({});
    try {
        await fetch('https://hook.eu1.make.com/p3hpedvrb8nny1w9c4103otdfjhjbjge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `📸 New Booking: ${bookingData.name}`,
                dueDate: bookingData.date,
                notes: `Email: ${bookingData.email}\nPhone: ${bookingData.phoneNumber}\nPackage: ${bookingData.package}`,
                list: ['Videography - Reservations']
            }),
        });
    } catch (err) {
        console.error('TickTick sync failed:', err);
    }

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

const deleteBooking = async (req,res)=>{
await Booking.findByIdAndDelete(req.params.bookingId)
res.redirect('/bookings')
}

module.exports = {
newBookingForm, createBooking, index, show, update, edit, deleteBooking,
};
