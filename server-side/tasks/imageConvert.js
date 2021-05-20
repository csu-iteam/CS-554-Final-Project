const fs = require('fs');

function getImageType(str) {
    var reg = /\.(png|jpg|gif|jpeg|webp)$/;
    return str.match(reg)[1];
}

function convertImageToBase64(fileName) {
    try{
        const data = fs.readFileSync(`.\/tasks\/images\/${fileName}`, 'binary');
        const buffer = new Buffer.from(data, 'binary');
        let imagebase64 = 'data:image/' + getImageType(fileName) + ';base64,' + buffer.toString('base64');
        return imagebase64;
    }catch(e){
        throw 'seed faild: open images resources failed. please make sure you start the server from ./server-side/ directory.'
    }
}

module.exports = {
    convertImageToBase64
}