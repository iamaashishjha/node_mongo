const responseHelper = require('../../utils/response_helper');
const { ObjectId } = require('mongodb');


class NoteCategoryController {
    static async index(req, res, db) {
        try {
            const findQuery = { text: { $ne: null } };
            const results = await db.collection('notes_category').find(findQuery).toArray();
            responseHelper.sendJsonResponse(res, 200, results, "Successfully Retrieved New Entries");
        } catch (err) {
            console.error('Error retrieving data : ', err);
            responseHelper.sendJsonResponse(res, 500, {}, "", {}, {'error': 'An error has occurred'});
        }
    }

    static async store(req, res, db) {
        const note = { text: req.body.text, title: req.body.title };
        try {
            const result = await db.collection('notes_category').insertOne(note);
            responseHelper.sendJsonResponse(res, 200, result, "Successfully Created New Entry");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", {}, { 'error':'An error has occurred'});
        }
    }

    static async show(req, res, db) {
        try {
            const details = { '_id': new ObjectId(req.params.id) };
            const result = await db.collection('notes_category').findOne(details);
            result ? responseHelper.sendJsonResponse(res, 200, result, "Successfully Created New Entry") : responseHelper.sendJsonResponse(res, 404, {}, "No Entry found to retrieve");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", {}, { 'error':'An error has occurred'});
        }
    }

    static async update(req, res, db) {
        try {
            const details = { '_id': new ObjectId(req.params.id) };
            const noteUpdates = { $set: { text: req.body.text, title: req.body.title } };
            const result = await db.collection('notes_category').updateOne(details, noteUpdates);
            result ? responseHelper.sendJsonResponse(res, 200, result, "Successfully updated Entry") : responseHelper.sendJsonResponse(res, 404, {}, "No Entry found to update");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", {}, { 'error':'An error has occurred'});
        }
    }

    static async delete(req, res, db) {
        try {
            const details = { '_id': new ObjectId(req.params.id) };
            const result = await db.collection('notes_category').deleteOne(details);
            (result.deletedCount > 0) ? responseHelper.sendJsonResponse(res, 200, result, "Successfully Deleted Entry") : responseHelper.sendJsonResponse(res, 404, {}, "No Entry found to delete");
        } catch (err) {
            responseHelper.sendJsonResponse(res, 500, {}, "", {}, { 'error':'An error has occurred'});
        }
    }
}

module.exports = NoteCategoryController;