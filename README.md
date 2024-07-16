
# Static Resume Website

This project demonstrates how to build a static resume website using AWS services such as S3, CloudFront, DynamoDB, Lambda, and API Gateway.

## Description

The website displays a static resume and tracks visitor counts using DynamoDB. The visitor count is updated via a Lambda function invoked by API Gateway.


![Dynamic Online Resume AWS](https://github.com/user-attachments/assets/13803f13-eeab-4ec3-b928-13e3a26fd089)

This project will guide you in creating a serverless, dynamic resume website leveraging various AWS services. This approach showcases your cloud skills and provides a practical example of AWS service integration, ultimately presenting your resume in a modern and scalable way.

## Services Overview:

1. Amazon S3 (Simple Storage Service): Used for hosting static website files.

2. Amazon CloudFront: A content delivery network (CDN) for fast global content distribution.

3. Amazon DynamoDB: A NoSQL database to store and retrieve the visitor count.

4. AWS Lambda: A serverless compute service to run our backend code.

5. Amazon API Gateway: Creates a RESTful API to connect the frontend with Lambda.

### Set Up S3 for Static Hosting

Create an S3 Bucket:

* Go to the Amazon S3 console.

* Click "Create bucket".

* Enter a unique bucket name (e.g., my-resume-website).

![createbucket](https://github.com/user-attachments/assets/25f199c2-c482-4583-97ce-f5789205a7ca)
