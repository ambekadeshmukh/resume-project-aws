
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

![Blockpb](https://github.com/user-attachments/assets/ee55f91e-9d2f-45bd-8e30-8da8ddbffd61)

* Click "Create bucket".

## Enable Static Website Hosting:

- Select your newly created bucket.

- Go to the "Properties" tab.

- Scroll down to "Static website hosting" and click "Edit".

![webh](https://github.com/user-attachments/assets/61532ffb-4007-47fe-82b3-a46e51b6fc43)

- Select "Enable" and specify index.html as the index document.

- Optionally, specify an error document (e.g., error.html).

- Click "Save changes".

## Upload Files to S3:

- Go to the "Objects" tab.

- Click "Upload" and add your HTML, CSS, and JavaScript files.

- Click "Upload".

  ![upload](https://github.com/user-attachments/assets/4d937ba6-0c20-4e77-bb62-167f4226d3d3)

**Note:** Don’t forget to add your ‘headshot image’ that you want displayed on your resume page.

- Configure Bucket Policy for Public Access:

- Go to the "Permissions" tab.

- Click on "Bucket policy" and add a policy to allow public reads:

``` json
{
"Version": "2012-10-17" ,
"Statement": [
{
"Sid": "PublicReadGetObject",
"Effect": "Allow",
"Principal": "*",
"Action": "s3: GetObject"
"Resource": "arn:aws: s3::: YOUR-BUCKET-NAME/*"'
}
]
}
```



