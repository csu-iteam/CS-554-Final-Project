const mongoCollections = require('../config/mongoCollections');
const images = mongoCollections.images;
var { ObjectId } = require('mongodb');

async function insertImage(imgbase64head) {
    const newImage = {
        imgbase64head: imgbase64head
    }
    try {
        const imageCollection = await images();
        const insertInformation = await imageCollection.insertOne(newImage);
        const imageId = insertInformation.insertedId;
        return imageId
    } catch (e) {
        throw "add image failed";
    }
}

async function getImageById(id) {
    const imageCollection = await images();
    const image = await imageCollection.findOne({ _id: ObjectId(id) });
    if (!image) throw 'image not found';
    return image;
}

module.exports={
    insertImage,
    getImageById
}