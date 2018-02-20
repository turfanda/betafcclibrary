const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
	book_title: {type: String},
	book_comment: [String]
});

var book = mongoose.model("issue",bookSchema)

module.exports = book;

module.exports.createBook = function(newBook,callback){
  newBook.save(callback);
}

module.exports.updateBookById = function(id,updates,callback){
  book.findByIdAndUpdate(id,updates,callback)
}

module.exports.getBookById = function(id,callback){
  book.findById(id,callback);
}
module.exports.getBookByName = function(name,callback){
  let query=({book_title:name});
  book.findOne(query,callback);
}
module.exports.deleteBook = function(id,callback){
  if(id!==undefined)
  book.findByIdAndRemove(id,callback);
  else
    book.remove({},callback);
}

module.exports.getBook = function(name,callback){
    if(name!==undefined)
    {
        let query=({book_title:name});
  book.findOne(query,callback);
    }
  else
  book.find(callback);
}