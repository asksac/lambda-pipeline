provider "aws" {
  profile = "terraform"
  region = "us-east-1"
}

# Create HelloFunction

resource "aws_s3_bucket_object" "upload_hello_to_s3" {
  bucket = "super-cali-fragilistic-expiali-docious"
  key    = "lambda/hello_function.zip"
  source = "./dist/hello.zip"
  etag = filemd5("./dist/hello.zip")
}

resource "aws_lambda_function" "create_hello_function" {
  function_name = "HelloFunction"

  s3_bucket = "super-cali-fragilistic-expiali-docious"
  s3_key    = "lambda/hello_function.zip"
  source_code_hash = filebase64sha256("./dist/hello.zip")

  handler = "hello.handler"
  runtime = "nodejs12.x"

  role = aws_iam_role.lambda_exec_role.arn
  depends_on = [aws_iam_role_policy_attachment.lambda_exec_policy]
}

# Create GreetingsFunction

resource "aws_s3_bucket_object" "upload_greetings_to_s3" {
  bucket = "super-cali-fragilistic-expiali-docious"
  key    = "lambda/greetings_function.zip"
  source = "./dist/greetings.zip"
  etag = filemd5("./dist/greetings.zip")
}

resource "aws_lambda_function" "create_greetings_function" {
  function_name = "GreetingsFunction"

  s3_bucket = "super-cali-fragilistic-expiali-docious"
  s3_key    = "lambda/greetings_function.zip"
  source_code_hash = filebase64sha256("./dist/greetings.zip")

  handler = "greetings.handler"
  runtime = "nodejs12.x"
  memory_size = 128 # default as well as minimum memory size is 128Mb

  role = aws_iam_role.lambda_exec_role.arn
  depends_on = [aws_iam_role_policy_attachment.lambda_exec_policy]
} 

# Create Lambda execution IAM role, giving permissions to access other AWS services

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_exec_role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
      "Action": [
        "sts:AssumeRole"
      ],
      "Principal": {
          "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": "LambdaAssumeRolePolicy"
      }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_basic_policy" {
  name        = "lambda_basic_policy"
  path        = "/"
  description = "IAM policy with basic permissions for Lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }, 
    {
      "Action": [
        "lambda:InvokeFunction"
      ],
      "Resource": "arn:aws:lambda:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_exec_policy" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_basic_policy.arn
}