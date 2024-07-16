
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

* Choose the appropriate region.

* Uncheck 'Block all public access' and acknowledge that the bucket will be public. This is necessary to allow public access to your resume website.

https://lh7-us.googleusercontent.com/docsz/AD_4nXfB1XGqXh_BcF6bsmQKZVkzaMWf1prk9JPq6Et-inbhogmldaLZ0f14f_L3NcX_2U0suBFo4zwGmszEBCEYxZKveQJvR0tHT44Qx6DxmxYC4m8nKK6L0rfoF8extvGtN_vdx1LB0-qsdi2BTS8BAQJK3PhJ?key=auWrZl8YEp-Qdh0gHUTvhw


