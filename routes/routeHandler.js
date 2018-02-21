const mongoose = require('mongoose');
const bookModel = require('../models/book');

exports.createBook = function(req, res) {
  console.log(req.body);
    let newBook = new bookModel({
        book_title: req.body.book_title,
      book_comment:[]
    });
    bookModel.createBook(newBook, function(err, data) {
        if (err) return res.status(501).send("Internal Error");
        else {
            return res.status(200).json({"book_title":data.book_title,"id":data._id});
        }
    });
}

exports.getAllBook = function(req, res) {
    bookModel.getAllBook(function(err, data) {
        if (err)
            return res.status(501).send("Internal Error");
        else {
          console.log(data);
          let result = data.map(function(value,index){return {"book_title":value.book_title,"id":value._id,"count":value.book_comment.length};});
            return res.json(result);
        }
    });
}

exports.deleteAllBook = function(req, res) {
    bookModel.deleteAllBook(function(err, data) {
        if (err)
            return res.status(501).send("Internal Error");
        else {
            return res.status(200).send("All Books deleted.Congrats you are like mongolian barbarians");
        }
    });
}

exports.getBookByName = function(req, res) {
    bookModel.getBook(req.params.book_title, function(err, data) {
        if (data === null) 
            return res.status(500).send("No such project");
        else 
            return res.json(data);
            
        });
}

exports.getBookById = function(req, res) {
    bookModel.getBookByID(req.params.book_Id, function(err, data) {
        if (data === null) 
            return res.status(500).send("No such project");
        else 
            return res.json(data);
            
        });
}

exports.deleteBook = function(req, res) {
    if (req.body.book_Id === '')
        return res.status(400).send("No Id Send");
    else
        bookModel.deleteBook(req.body.book_Id, function(err, data) {
            if (err)
                return res.status(400).send("No such book");
            else
                return res.status(200).send("Book succesfuly deleted");
        });
}

exports.updateBook = function(req, res) {
  let updates = req.body.book_comment;
    if (req.body.book_id === '')
        return res.status(400).send("No Id Send");
    else 
      bookModel.updateBookById(req.body.book_id, updates, function(err, data) {
                if (err)
                    return res.status(400).send("No such issue");
                else
                    return res.status(200).send("Issue Updated");
            });
        
    }
