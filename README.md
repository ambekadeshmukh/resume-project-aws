
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
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
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

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-count')

def lambda_handler(event, context):
    response = table.get_item(Key={'id': 'visitors'})
    count = response['Item']['count'] if 'Item' in response else 0
    count += 1
    
    table.put_item(Item={'id': 'visitors', 'count': count})
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'count': count})
    }
```

- Click "Deploy".

**Configure Lambda Permissions:**

- Go to "Configuration" > "Permissions".

- Click on the role name to open IAM.

- In IAM, click "Add permissions" > "Create inline policy".

- In the JSON tab, paste the following:

``` json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```
Name the policy and click "Create policy".

![iam ](https://github.com/user-attachments/assets/e7da67b5-c70a-4080-be16-fdad420373e9)

**Create an API Gateway**

Set Up the API:

- Go to API Gateway in AWS Console.

- Click "Create API" and choose "REST API".

- Set API name to "ResumeAPI".

- Click "Create API".

![api1](https://github.com/user-attachments/assets/83543a08-2f95-4ef3-bc4f-d8cf94d737bb)

**Create a Resource and Method:**

- Click "Actions" > "Create Resource".

- Set Resource Name to "visitorcount".

- Click "Create Resource".

![res](https://github.com/user-attachments/assets/4891c041-3802-4fd7-a184-e2adfa946a0f)

With the new resource selected, click "Actions" > "Create Method".

Select "GET" from the dropdown and click the checkmark.

![api2](https://github.com/user-attachments/assets/39490574-68a6-42c2-87cb-bc3d696896fa)

For Integration type, select "Lambda Function".

![method](https://github.com/user-attachments/assets/7f802208-6f44-465a-b96c-e24be505c003)

- Select your region and enter "updateVisitorCount" for Lambda Function.

- Click "Save" and "OK" to give permission.

**Configure CORS:**

- Click on "Method Response".

- Expand "200", click "Add Header", enter "Access-Control-Allow-Origin".

![me](https://github.com/user-attachments/assets/2f74ec30-e1b8-4cab-8780-b0ff01eaf2bc) 

- Go back to the method execution and click on "Integration Response".

- Expand the 200 response, expand "Header Mappings".

![200](https://github.com/user-attachments/assets/f6ad891f-eb2a-40ca-8f37-5507d8a67e92) 

- For "Access-Control-Allow-Origin", enter "'*'" (with single quotes).

- Click "Actions" > "Enable CORS".

![ress](https://github.com/user-attachments/assets/fee9efe5-a578-4546-be2a-1cc8aeb3863e) 

In the "Enable CORS" form that appears:

    For "Access-Control-Allow-Headers", enter: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'

    For "Access-Control-Allow-Methods", ensure that GET is checked (along with any other methods you need).

    For "Access-Control-Allow-Origin", enter '*' (or your specific domain if you want to restrict access).

Leave the other settings as default unless you have specific requirements.

Click on "Save Changes" at the bottom of the form.

![cors](https://github.com/user-attachments/assets/553c90ef-119a-4d90-9e3b-662a34d66ee1) 

**Deploy the API:**

- After enabling CORS, you need to redeploy your API for the changes to take effect. To do this:

- Click on "Actions" again

- Select "Deploy API" from the dropdown

- Choose your deployment stage (e.g., "prod") or create a new one if needed

- Click "Deploy"
  

![api4](https://github.com/user-attachments/assets/ad002fb0-95be-4ebc-88eb-a2f1e028515c) 


- Note the "Invoke URL" for later use.

![stages](https://github.com/user-attachments/assets/04eff2fe-0300-4459-bf14-6fa7348cfd94) 

**Update Your Website Code**

Update your JavaScript to call the API Gateway endpoint:

``` javascript
function updateVisitorCount() {
    fetch('YOUR_API_GATEWAY_ENDPOINT/visitorcount')
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitor-count').textContent = data.count;
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    createTimelineItems();
    updateVisitorCount();
});
```

Replace 'https://your-api-gateway-url' with your actual API Gateway URL.

![scr](https://github.com/user-attachments/assets/5ade4cbc-91f1-41db-9bef-3e8518b5139c)

In your index.html, add somewhere appropriate:

``` html
<p>Visitor count: <span id="visitor-count">0</span></p>
```
Re-upload the updated index.html and script.js to your S3 bucket

**Test Your Website**

- Use the CloudFront distribution domain name to access your website - https://d3p4s4oinotbob.cloudfront.net/

- Verify that all content is displayed correctly.

- Check that the visitor count increases on each page load.

![web](https://github.com/user-attachments/assets/09fa3479-6a4e-4f6a-968e-46da20a82188) 

**Troubleshooting:**

If you encounter any issues during testing, do the following:

    If content is missing or incorrectly formatted, you may need to review and update your HTML and CSS files, then re-upload them to your S3 bucket.

    If the visitor count isn't increasing, check your Lambda function logs in AWS CloudWatch for any errors.

    If the page doesn't load at all, verify that your S3 bucket permissions and CloudFront distribution settings are correct.

Remember, after making any changes to your S3 bucket contents, you may need to invalidate your CloudFront cache to see the changes immediately. You can do this in the CloudFront console by creating an invalidation for "/*".

**Conclusion:**

This project demonstrates the power and flexibility of serverless architecture and AWS service integration. By leveraging Amazon S3 for static hosting, CloudFront for content delivery, DynamoDB for data storage, Lambda for serverless computing, and API Gateway for API management, we have created a dynamic, scalable, and cost-effective resume website. This approach not only enhances your technical skills but also provides a modern platform to showcase your professional profile.






























