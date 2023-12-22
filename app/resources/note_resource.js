const moment = require('moment');
const fileHelper = require('../utils/file_helper');
const baseUrl = 'http://localhost:8000'


module.exports = {

    fetchFormattedImagePaths(imagePath) {
        if (imagePath && Array.isArray(imagePath) && imagePath.length > 0) {
            imagePath = fileHelper.getCompleteFilePath(imagePath, baseUrl);
            return imagePath;
        } else{
            return [];
        }
    },

    // single transformation
    noteResource(data) {
        return {
            'title': data.title,
            'text': data.text,
            'category': data.category_id,
            'images': this.fetchFormattedImagePaths(data.image_paths),
            'created_at': moment(data.created_at).format('YYYY-MM-DD HH:mm:ss'),
        };
    },

    noteResourceCollection(dataArr) {
        var retDataArr = [];
        dataArr.forEach((element, index) => {
            retDataArr.push(this.noteResource(element));
        });
        return retDataArr;
    },


};