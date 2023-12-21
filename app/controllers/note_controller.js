const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const responseHelper = require('../../utils/response_helper');
const fileHelper = require('../../utils/file_helper');
const Note = require('../models/note'); // Import the Note model
const db = require('../../config/db');
// const database = await db.connectToMongoDB();


// await db.connectToMongoDB();
// // Connect to MongoDB
mongoose.connect(db.url);


class NoteController {
    static async index(req, res, db) {
        try {
            const backendDomain = `${req.protocol}://${req.get('host')}`;
            const aggregateArr = [
                {
                    $match: { text: { $ne: null } }
                },
                {
                    $lookup: {
                        from: 'notes_category',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $project: {
                        '_id': 0,
                        'title': 1,
                        'text': 1,
                        'category_name': { $ifNull: [{ $arrayElemAt: ['$category.title', 0] }, null] },
                        'image_paths': 1,
                    }
                }
            ];
            const results = await Note.aggregate(aggregateArr);
            results.forEach(result => {
                fileHelper.getCompleteFilePath(result.image_paths)
            });
            responseHelper.sendJsonResponse(res, 200, results, "Successfully Retrieved New Entries");
        } catch (err) {
            console.error('Error retrieving data : ', err);
            responseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
        }
    }

    static async store(req, res, db) {
        try {
            const noteRqstObj = {
                text: req.body.text,
                title: req.body.title,
                category_id: new ObjectId(req.body.category_id),
            };
            console.log(req.files);
            noteRqstObj['image_paths'] = fileHelper.uploadFile(req.files, 'notes');
            // Create a new note using the Note model
            const note = new Note(noteRqstObj);
            // Save the new note to the database
            note.save().then(result => {
                console.log('Note saved:', result);
                responseHelper.sendJsonResponse(res, 200, result, "Successfully Created New Entry");
            }).catch(error => {
                console.error('Error saving note:', error);
                responseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
            });
        } catch (err) {
            console.log(err);
            responseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
        }
    }

    static async show(req, res, db) {
        try {
            const details = { '_id': new ObjectId(req.params.id) };
            const aggregateArr = [
                {
                    $match: details
                },
                {
                    $lookup: {
                        from: 'notes_category',
                        localField: 'category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $project: {
                        '_id': 0,
                        'title': 1,
                        'text': 1,
                        'category_name': { $ifNull: [{ $arrayElemAt: ['$category.title', 0] }, null] },
                        'image_path': 1,
                    }
                }
            ];
            const result = await Note.aggregate(aggregateArr);
            result ? responseHelper.sendJsonResponse(res, 200, result, "Successfully Retrived Entry") : responseHelper.sendJsonResponse(res, 500, {}, "No Entry found to retrieve");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
        }
    }

    static async update(req, res, db) {
        try {
            const details = { '_id': new ObjectId(req.params.id) };
            const noteRqstArr = { $set: { text: req.body.text, title: req.body.title, category_id: new ObjectId(req.body.category_id) } };
            const result = await Note.findOneAndUpdate(details, noteRqstArr);
            result ? responseHelper.sendJsonResponse(res, 200, result, "Successfully updated Entry") : responseHelper.sendJsonResponse(res, 500, {}, "No Entry found to update");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
        }
    }

    static async delete(req, res, db) {
        try {
            const details = { '_id': new ObjectId(req.params.id) };
            const result = await Note.deleteOne(details);
            (result.deletedCount > 0) ? responseHelper.sendJsonResponse(res, 200, result, "Successfully Deleted Entry") : responseHelper.sendJsonResponse(res, 404, {}, "No Entry found to delete");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", { 'error': 'An error has occurred' });
        }
    }
}

module.exports = NoteController;
