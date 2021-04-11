import { String } from 'aws-sdk/clients/apigateway';
import s3 from 'aws-sdk/clients/s3';
import { AWSError, S3 } from 'aws-sdk';
import fs from 'fs';
import { threadId } from 'node:worker_threads';

class Storage {
    private client: S3;
    private region: String;
    private accessKeyId: String;
    private secretAccessKey: String;
    private bucketName: String;

    constructor() {
        this.region = process.env.AWS_REGION!;
        this.accessKeyId = process.env.AWS_ACCESS_KEY!;
        this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
        this.bucketName = process.env.AWS_BUCKET_NAME!;

        const config = {
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        };

        this.client = new s3(config);
    }

    public async listObjects() {
        let output = null;

        const bucketParams = {
            Bucket: this.bucketName,
        };

        try{
            output = await this.client.listObjects(bucketParams).promise();
        }catch(error) {
            console.log(`Error listing objects: ${error}`);
        }

        return output;
    }

    public async getObjectToPath(objectKey: string, outputPath: string) {
        const bucketParams = {
            Bucket: this.bucketName,
            Key: objectKey,
        }

        if(!objectKey) {
            return;
        }

        try {
            fs.writeFile(outputPath,'', function(err: any) {
                if (err) throw err;
                console.log('New file created for storage object writing.');
            });
            var file = fs.createWriteStream(outputPath);

            await this.client.getObject(bucketParams).createReadStream().pipe(file);
        }catch(error) {
            console.log(`Error fetching object: ${error}`);
        }
    }
}

export default Storage;