import { String } from 'aws-sdk/clients/apigateway';
import s3 from 'aws-sdk/clients/s3';
import { S3 } from 'aws-sdk';
import fs from 'fs';

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
        const params = {
            Bucket: this.bucketName,
            Key: objectKey,
        }

        if(!objectKey) {
            return;
        }

        try {
            fs.writeFile(`${outputPath}/${objectKey}`,'', function(err: any) {
                if (err) throw err;
                console.log('New file created for storage object writing.');
            });
            var file = fs.createWriteStream(`${outputPath}/${objectKey}`);

            const stream = this.client.getObject(params).createReadStream().pipe(file);

            return new Promise((resolve, reject) => {
                stream.on('close', () => resolve(`${outputPath}/${objectKey}`));
                stream.on('error', reject);
            });
        }catch(error) {
            console.log(`Error fetching object: ${error}`);
        }
    }

    public getMultipleObjectsToDirectory = async (fileKeys: string[], downloadPath: string) => {
        const downloadPromises = fileKeys.map(async (fileKey) => {
            return this.getObjectToPath(fileKey, downloadPath);
        });

        await Promise.all(downloadPromises)
            .then(() => console.log('Sample downloads completed.'))
            .catch(() => console.log('Error occured while downloading samples.'));
    }

    public async uploadFile(file: any) {
        const fileContent  = Buffer.from(file.data, 'binary');

        const params = {
            Bucket: this.bucketName,
            Body: fileContent,
            Key: file.name,
        }

        return this.client.upload(params).promise();
    }

    public async fileExists(fileKey: string) {
        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
        };

        try {
            const response = await this.client.headObject(params).promise();
            return true;
        } catch(error) {
            return false;
        }
    }

    public async deleteFile(fileKey: string) {
        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
        };

        try {
            const response = await this.client.deleteObject(params).promise();
            return response;
        } catch(error) {
            return error;
        }
    }
}

export default Storage;