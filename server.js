var helmet = require("helmet");
var express = require('express');
const bodyparser = require('body-parser');
var mongoose = require("mongoose");
var routes = require("./routes/routeHandler");
var app = express();

mongoose.connect(process.env.MONGO_URL, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The Mongoose connection is ready');
    }
});

app.use(helmet());
app.use(helmet.noCache())
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/books",routes.getAllBook);
app.post("/api/books",routes.createBook);
app.delete("/api/books",routes.deleteAllBook);
app.get("/api/books/:book_id",routes.getBookById);
app.post("/api/books/:book_id",routes.updateBook);
app.delete("/api/books/:book_id",routes.deleteBookById);


if (!module.parent) {
    var listener = app.listen(process.env.PORT, function() {
        console.log('Your app is listening on port ' + listener.address().port);
    });
}

module.exports = app;