
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
          "Resource": "arn:aws: s3::: YOUR-BUCKET-NAME/*"
        }
    ]
}
```
- Replace "your-bucket-name" with your actual bucket name.

- Click "Save changes".

**Set Up CloudFront Distribution**

-Create CloudFront Distribution:

-Go to the CloudFront console (https://console.aws.amazon.com/cloudfront/).

-Click "Create Distribution".

-For "Origin Domain", select your S3 bucket's website endpoint.

![dist](https://github.com/user-attachments/assets/d9278748-de9c-4f5c-ab34-91dfd94efb37)


-For "Viewer protocol policy", choose "Redirect HTTP to HTTPS".

-Leave other settings as default.

-Click "Create distribution".

-Note the "Distribution domain name" for later use.

**Set Up DynamoDB for Visitor Count**

-Create a DynamoDB Table:

-Go to the DynamoDB console (https://console.aws.amazon.com/dynamodb/).

-Click "Create table".

-Enter "VisitorCount" as the table name.

-Set the partition key to "VisitorID" (type: String).

-Click "Create".

![table](https://github.com/user-attachments/assets/e697fc89-28de-4cf8-9a46-41958989f4a1)

**Create a Lambda Function**

-Set Up the Lambda Function:

-Go to Lambda in AWS Console.

-Click "Create function".

-Choose "Author from scratch".

-Set "Function name" to "updateVisitorCount".

-Select "Python 3.9" for Runtime.

-Under "Permissions", choose "Create a new role with basic Lambda permissions".

-Click "Create function".

![func](https://github.com/user-attachments/assets/6bb308f5-1bf5-4fb9-a792-cd44df67b500)

**Add Function Code:**

In the function code area, paste the following Python code:

``` python
import json
import boto3
dynamodb = boto3. resource ('dynamodb' )
table = dynamodb. Table( 'visitor-count')

def lambda_handler (event, context) :
    response = table-get_item(Key={'id': 'visitors'})
    count = responsel 'Item']['count'] if 'Item' in response else 0
    count += 1

    table-put_item(Item={'id': 'visitors', 'count': count})

    return {
          'statusCode': 200,
          'headers': {
             'Access-Control-Allow-Origin': '*'
          ｝，
          'body': json. dumps ({'count': count})
}
```







