/* eslint-disable prettier/prettier */

import RecruitmentDocumentModel from '@/models/recruitment/document.model';
import EmployeeModel from '@/models/employee/employee.model';
import { IDocument } from '@/interfaces/recruitment/document.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreateDocumentDto, UpdateDocumentDto } from '@/dtos/recruitment/document.dto';

const { SocketLabsClient } = require('@socketlabs/email');
const AWS = require('aws-sdk');
const mime = require('mime-types')
const path = require('path');
const { uuid } = require('uuidv4')

const mimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword',
    'application/pdf',
    'text/csv',
    'application/mp4',
    'video/mp4',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/html',
    'text/plain',
    'application/rtf'
]

const imageMimeTypes = [     
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif'
]

class DocumentService {
    public document: any;
    public employee: any;
    public role: any;
    public ID: any;
    public SECRET: any;
    public BUCKET_NAME: any;
    public params: any;
    public s3: any;

    constructor() {
        this.document = RecruitmentDocumentModel;
        this.employee = EmployeeModel;
        this.ID = process.env.Access_Key_ID;
        this.SECRET = process.env.Secret_Access_Key;
        this.BUCKET_NAME = process.env.BUCKET_NAME;
        this.params = this.bucketParams();
        this.s3 = new AWS.S3({
            accessKeyId: this.ID,
            secretAccessKey: this.SECRET
        });
        this.createBucket()
    }

    public async findAll(param: any = {}): Promise<IDocument[]> {
        const documents: IDocument[] = await this.document.find(param)
        return documents;
    }

    public async find(documentId: string): Promise<IDocument> {
        if (isEmpty(documentId)) throw new HttpException(400, "Missing Id Params");
        const finddocument = this.findOne(documentId);
        if (!finddocument) throw new HttpException(409, "document not found");
        return finddocument;
    }

    public async create(Payload: CreateDocumentDto, req: any): Promise<any> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        if(!req.files || req.files.length > 1) throw new HttpException(409, "Please upload a file");
        const file = req.files.document 
        if(!mimeTypes.includes(file.mimetype)) throw new HttpException(409, "Only PNG, JPG, JPEG, GIF files are allowed");
        const extension = path.extname(file.name)
        const filename = uuid() + extension
        Payload.file_extension = extension.replace(".", "")
        Payload.file_type = file.mimetype
        Payload.file_name = path.parse(file.name).name
        Payload.file_size = file.size
        // Setting up S3 upload parameters
        const params = {
            Bucket: this.BUCKET_NAME,
            Key: filename, // File name you want to save as in S3
            Body: file.data,
            ContentEncoding: 'base64',
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        const result = await this.saveFileInBucket(params)
        Payload.file_path = result.Location
        const newdocument: IDocument = await this.document.create(Payload);
        return newdocument;
    }

    public async update(documentId: string, Payload: UpdateDocumentDto): Promise<IDocument> {
        if (isEmpty(Payload)) throw new HttpException(400, "Bad request");
        const finddocument = this.findOne(documentId);
        if (!finddocument) throw new HttpException(409, "document not found");
        const updatedocument: IDocument = await this.document.findByIdAndUpdate(documentId, { Payload }, {new: true});
        return updatedocument;
    }

    public async delete(documentId: string): Promise<IDocument> {
        const drop: IDocument = await this.document.findByIdAndDelete(documentId);
        if (!drop) throw new HttpException(409, `${documentId} Loan does not exist`);
        return drop;
    }

    private async findOne(id: string): Promise<IDocument> {
        const finddocument: IDocument = await this.document.findOne({ _id: id });
        return finddocument;
    }

    private bucketParams(): any {
        const params = {
            Bucket: this.BUCKET_NAME,
            CreateBucketConfiguration: {
                // Set your region here
                LocationConstraint: "eu-west-1"
            }
        }
        return params
    }

    private createBucket(): any {
        this.s3.createBucket(this.params, function(err, data) {
            if (err && err.statusCode == 409){
                console.log("Bucket has been created already");
            }else{
                // console.log(data)        
                console.log('Bucket Created Successfully', data);
            }
        })
    }

    private async saveFileInBucket(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            // Uploading files to the bucket
            this.s3.upload(params, function(err, data) {
                if (err) {
                    return reject(err);
                }
                // console.log(data)
                console.log(`File uploaded successfully. ${data}`)
                return resolve(data)
            });
        })
    }
    
}

export default DocumentService;