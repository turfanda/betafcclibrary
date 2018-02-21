const mongoose = require('mongoose');
const bookModel = require('../models/book');

exports.createBook = function(req, res) {
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
            return res.status(200).send("All Books deleted.congratulations you are like mongol barbarians");
        }
    });
}

exports.getBookById = function(req, res) {

    bookModel.getBookById(req.params.book_id, function(err, data) {
        if (data === null) 
            return res.status(500).send("No such book");
        else 
            return res.json(data);
            
        });
}

exports.deleteBookById = function(req, res) {
        bookModel.deleteBookById(req.params.book_id, function(err, data) {
            if (err)
                return res.status(400).send("No such book");
            else
                return res.status(200).send("Book succesfuly deleted");
        });
}

exports.updateBook = function(req, res) {
      bookModel.updateBookById(req.params.book_id, req.body.book_comment, function(err, data) {
        console.log(data);
                if (err)
                    return res.status(400).send("No such Book");
                else
                    return res.status(200).json(data);
            });
        
    }
