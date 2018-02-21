const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
	book_title: {type: String},
	book_comment: [String]
});

var book = mongoose.model("book",bookSchema)

module.exports = book;

module.exports.createBook = function(newBook,callback){
  newBook.save(callback);
}

module.exports.updateBookById = function(id,updates,callback){
  book.findByIdAndUpdate(id,updates,callback)
  
  bookfindByIdAndUpdate(id,{ "$push": { "book_": employee._id } },
}

module.exports.getAllBook = function(callback){
  book.find(callback);
}

module.exports.getBookById = function(id,callback){
  book.findById(id,callback);
}

module.exports.deleteAllBook = function(callback){
    book.remove({},callback);
}

module.exports.deleteBookById = function(id,callback){
    book.findByIdAndRemove(id,callback);
}

