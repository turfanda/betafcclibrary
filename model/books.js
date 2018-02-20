const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
	title: {type: String},
	comment: [String],
});

var book = mongoose.model("issue",bookSchema)

module.exports = book;

module.exports.createBook = function(newBook,callback){
  newBook.save(callback);
}

module.exports.updateBookById = function(id,updates,callback){
  book.findByIdAndUpdate(id,updates,callback)
}

module.exports.getBook = function(id,callback){
  book.findfindById(id,callback);
}
module.exports.deleteBookById = function(id,callback){
  book.findByIdAndRemove(id,callback);
}