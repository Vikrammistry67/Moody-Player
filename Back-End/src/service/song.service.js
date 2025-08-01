var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: "public_hyhkxNtH91ErdrixB/a9sgnqUGI=",
    privateKey: "private_M/waoKMSZqIYHN615ah1skiVftk=",
    urlEndpoint: "https://ik.imagekit.io/ejrzyyonza"
});

function uploadFile(file) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file.buffer,
            fileName: file.fieldname + Date.now(),
            folder: "COHORT-moodyPlayer/audio"
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result)
        })
    })
}

module.exports = uploadFile;