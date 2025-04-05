// AWS S3

// const aws = require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
// const config = require('../config');

// aws.config.update({
//     secretAccessKey: config.aws_secret_access_key,
//     accessKeyId: config.aws_access_key_id
// });

// const s3 = new aws.S3();

const uploadPapers3 = multer({
//   storage: multerS3({
//     //     user: 'Admin',
//     //     // acl: 'public-read-write',
//     //     // bucket: 'poly.rgpvexam.in',
//     //     metadata: function (req, file, cb) {
//     //         cb(null, { fieldName: file.originalname });
//     //     },
//     //     key: function (req, file, cb) {
//     //         cb(null, 'offlinepaper/' + file.originalname)
//     //     }
//     // }),
//     // dest: function (req, file, cb) {
//     //     cb(null, "./offlinepaper");
//     // },
//   }),
});

module.exports = uploads3 = { uploadPapers3 };
