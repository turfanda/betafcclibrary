const mongoose = require('mongoose');
const bookModel = require('../models/book');

exports.createBook = function(req, res) {
    let newBook = new bookModel({
        title: req.body.book_title
    });
    bookModel.createBook(newBook, function(err, data) {
        if (err) return res.status(501).send("Internal Error");
        else {
            return res.status(200).send("<em><b>" + req.body.book_title + "</em></b> has been created and id of this book is :" + "<em><b>" + data._id + "</em></b>");
        }
    });
}

exports.getAllBook = function(req, res) {
    bookModel.getAllBook(function(err, data) {
        if (err)
            return res.status(501).send("Internal Error");
        else {
            return res.json(data)
        }
    });
}

exports.getBookByName = function(req, res) {
    bookModel.getBookByName(req.params.book_title, function(err, data) {
        if (data === null) 
            return res.status(500).send("No such project");
        else 
            return res.json(data);
            
        });
}

exports.getBookById = function(req, res) {
    bookModel.getBookByName(req.params.book_title, function(err, data) {
        if (data === null) 
            return res.status(500).send("No such project");
        else 
            return res.json(data);
            
        });
}

exports.createIssue = function(req, res) {
    let projectId;
    projectModel.getProjectByName(req.body.project_name, function(err, data) {
        if (data === null) {
            let project = new projectModel({
                project_name: req.body.project_name
            });
            projectModel.createProject(project, function(err, data) {
                if (err) res.status(501).send("Internal Error");
                else {
                    projectId = data._id;
                    let issue = new issueModel({
                        issue_title: req.body.issue_title,
                        issue_text: req.body.issue_text,
                        created_by: req.body.created_by,
                        assigned_to: req.body.assigned_to,
                        created_on: Date().now,
                        updated_on: Date().now,
                        open: true,
                        status: req.body.status,
                        _project: projectId
                    });

                    issueModel.createIssue(issue, function(err, data) {
                        if (err) res.status(501).send("Internal Error");
                        else {
                            return res.send("<em><b>" + data.issue_title + "</em></b> has been created and id of this issue is :" + "<em><b>" + data._id + "</em></b>");
                        }
                    });
                }
            });

        } else {
            projectId = data._id;
            let issue = new issueModel({
                issue_title: req.body.issue_title,
                issue_text: req.body.issue_text,
                created_by: req.body.created_by,
                assigned_to: req.body.assigned_to,
                created_on: Date().now,
                updated_on: Date().now,
                open: true,
                status: req.body.status,
                _project: projectId
            });
            issueModel.createIssue(issue, function(err, data) {
                if (err) res.status(501).send("Internal Error");
                else {
                    return res.send("<em><b>" + data.issue_title + "</em></b> has been created and id of this issue is :" + "<em><b>" + data._id + "</em></b>");
                }
            });
        }
    });
}

exports.deleteIssue = function(req, res) {
    if (req.body.issue_Id === '')
        return res.status(400).send("No Id Send");
    else
        issueModel.deleteIssueById(req.body.issue_Id, function(err, data) {
            if (err)
                return res.status(400).send("No such issue");
            else
                return res.status(200).send("Issue deleted from project :<em><b>" + req.body.project_name + "</em></b> with ıd of : <em><b>" + req.body.issue_Id + "</em></b>");
        });
}
exports.updateIssue = function(req, res) {
    console.log(req.body);
    if (req.body.issue_Id === '')
        return res.status(400).send("No Id Send");
    else {
        let updates = {}
        if (req.body.issue_title !== undefined && req.body.issue_title !== "")
            updates.issue_title = req.body.issue_title;
        if (req.body.issue_text !== undefined && req.body.issue_text !== "")
            updates.issue_text = req.body.issue_text;
        if (req.body.created_by !== undefined && req.body.created_by !== "")
            updates.created_by = req.body.created_by;
        if (req.body.assigned_to !== undefined && req.body.assigned_to !== "")
            updates.assigned_to = req.body.assigned_to;
        if (req.body.status !== undefined && req.body.status !== "")
            updates.status = req.body.status;
        if (req.body.open !== undefined && req.body.open !== "")
            updates.open = req.body.open;

        if (Object.keys(updates).length !== 0) {
            updates.updated_on = Date().now;
            issueModel.updateIssueById(req.body.issue_Id, updates, function(err, data) {
                if (err)
                    return res.status(400).send("No such issue");
                else
                    return res.status(200).send("Issue Updated");
            });
        }
    }
}