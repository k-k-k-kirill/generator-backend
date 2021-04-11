// import express, { Application, Request, Response } from 'express';

// const app: Application = express();

// app.get('/', (req: Request, res: Response) => {
//     res.send('Wassup');
// });

// app.listen(3000, () => {
//     console.log("We are online!");
// });
require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const path = require('path');

import App from './app';

new App();

// const region = process.env.AWS_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const bucketName = process.env.AWS_BUCKET_NAME;

// const s3 = new S3({
//     region,
//     accessKeyId,
//     secretAccessKey,
// })

// s3.listObjects(bucketParams, (err: any, data: any) => {
//     if (err) {
//         console.log("Error", err);
//       } else {
//         console.log("Success", data);
//       }
// })

// const testFileKey = 'hiphop_drill_140_drums_T1.wav';
// const pathToFile = path.join(__dirname, `../../resources/downloads/${testFileKey}`);

// const bucketParams = {
//     Bucket: bucketName,
//     Key: testFileKey,
// }
// fs.writeFile(pathToFile,'', function(err: any) {
//     if (err) throw err;
//     console.log('New file created!')
// });
// var file = fs.createWriteStream(pathToFile);
// s3.getObject(bucketParams).createReadStream().pipe(file);
