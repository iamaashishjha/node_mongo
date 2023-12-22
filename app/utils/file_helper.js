
const fs = require('fs');
const path = require('path');

function uploadFile(fileAttribute, folderPath = null, uploadDir = 'uploads') {
    let returnFilePath = null;
    if (fileAttribute) {
        if (Array.isArray(fileAttribute)) {
            let uploadedFilePaths = [];
            for (const flAttr of fileAttribute) {
                const filePath = uploadSingle(flAttr, folderPath, uploadDir);
                if (filePath) {
                    uploadedFilePaths.push(filePath);
                }
            }
            returnFilePath = uploadedFilePaths;
        } else {
            returnFilePath = uploadSingle(fileAttribute, folderPath, uploadDir);
        }
    }
    return returnFilePath;
}

function uploadSingle(fileAttribute, folderPath, uploadDir) {
    uploadDir = folderPath ? path.join(process.cwd(), uploadDir, folderPath) : path.join(process.cwd(), uploadDir);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filename = `${Date.now()}_${fileAttribute.originalname}`;
    // Write the file to the destination
    let filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, fileAttribute.buffer);
    return filePath.replace(process.cwd() + '\\', '');
}

function getCompleteFilePath(fileAttribute, backendDomain) {
    if (fileAttribute) {
        if (typeof fileAttribute === 'string') {
            // If it's a single string, add backendDomain to it
            fileAttribute = `${backendDomain}/${fileAttribute.trim()}`;
        } else if (Array.isArray(fileAttribute)) {
            // Add backendDomain to each path in the array
            fileAttribute = fileAttribute.map(path => `${backendDomain}/${path.trim()}`);
        }
    }
    return fileAttribute;
}

module.exports = {
    uploadFile,
    getCompleteFilePath,
};
