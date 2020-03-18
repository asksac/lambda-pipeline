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

  handler = "hello.handler"
  runtime = "nodejs12.x"

  role = aws_iam_role.lambda_exec.arn
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

  handler = "greetings.handler"
  runtime = "nodejs12.x"
  memory_size = 128 # default as well as minimum memory size is 128Mb

  role = aws_iam_role.lambda_exec.arn
}

# Create Lambda execution IAM role, giving permissions to access other AWS services

resource "aws_iam_role" "lambda_exec" {
  name = "LambdaExecRole"
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