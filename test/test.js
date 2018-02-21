const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
let app = require("../server");
chai.use(chaiHttp);

let books = [{book_title: 'book1', book_comment: 'comment1', id: ''},
             {book_title: 'book2', book_comment: 'comment2', id: ''}]

describe("Tests", function() {
    describe("Functionla Test", function() {
      for (let book of books){
        it("createBook", function(done) {
            chai.request(app)
                .post('/api/books')
                .send({book_title:book.book_title})
                .end(function(err, res) {
                    expect(res.body).to.have.property('book_title');
                    expect(res.body).to.have.property('id');
                    assert.isString(res.body.book_title);
                    assert.deepEqual(res.body.book_title, book.book_title);  
                    book.id = res.body.id;  
                    done();
                });
        });
        it("AddComment", function(done) {
          chai.request(app)
                .post('/api/books/'+book.id)
                .send({book_comment: book.book_comment})
                .end(function(err, res) {
            console.log(res.body);
                    expect(res.body).to.have.property('book_title');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('book_comment');
                    assert.isString(res.body.book_title);
                    assert.deepEqual(res.body.book_title, book.book_title);                      
                    assert.isArray(res.body.book_comment);
                    done();   
                });
        });
      }
    });
});