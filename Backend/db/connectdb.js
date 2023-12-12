const mongoose = require('mongoose')

// * This is the mongodb Atlas connection link
const dbConnect = 'mongodb+srv://gorayausman061:Z0GiGTFr4JIPiUvl@cluster0.vdk3ku9.mongodb.net/TODO?retryWrites=true&w=majority';

// * Theses are the parameters
const connectionParams = {
    useNewUrlParser: true, useUnifiedTopology: true,
};

// * This is the mongodb Atlas connection
mongoose.connect(dbConnect, connectionParams).then(() => {

    console.log('Hurrah! MongoDB connection successfully established :)');

}).catch((err) => {

    console.log('Sorry Bro! MongoDB is not connected :(', err);

})