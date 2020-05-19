# AWS Lambda Build, Test and Depoy Pipeline - An Example

This project shows how to use tools such as AWS SAM, Gulp and Terraform to build, test and deploy 
a couple of AWS Lambda functions. It also serves to demonstrate how one Lambda service can invoke 
another Lambda using AWS SDK. 

## Tools Used

#### Development tools used: 
* [Visual Studio Code](https://code.visualstudio.com) - Source code editor and IDE (free software 
from Microsoft)
* [Git](https://git-scm.com) - An open-source version control system (comes preinstalled in MacOS 
and many Linux distros)
* [Node.js]() - An open-source Javascript runtime environment for server-side applications
* [Gulp](https://gulpjs.com) - An open-source Javascript based build tool 

#### Testing tools used: 
* [AWS SAM](https://aws.amazon.com/serverless/sam/) - AWS Serverless Application Model (SAM) is 
an open-source framework for building and testing serverless applications on AWS

#### Deployment tools used: 
* [Terraform](https://www.terraform.io) - An open source infrastructure as code (IaC) tool

## Downloading and building this project

As this project relies on some tools (listed above), ensure you have Node.js and Gulp installed and 
working. Verify installation by running `node --version` and `gulp --version` from a shell terminal.

Next, follow these steps to download and build the project: 

1. Open a terminal and clone this project by executing: 
  ```bash
  $ git clone https://github.com/asksac/lambda-pipeline.git
  ``` 

2. Install project dependencies by executing: 
  ```bash
  $ cd lambda-pipeline
  $ npm install
  ```
3. Now, you're ready to build the project. After this step, you will have the Lambda packages in 
  the `dist` directory. Run the following commands: 
  ```bash
  $ gulp
  $ ls -al dist
  ```

## Running the example Lambda functions locally

After the project is installed and built, you're ready to run the Lambda functions locally, or deploy 
to your AWS account. Ensure that you have AWS CLI and AWS SAM CLI tools installed on your computer 
or virtual machine. See steps in next section on how to install AWS SAM CLI tool. 

Follow these steps to launch SAM local environment and run the Lambda functions: 

1. Launch `sam local` by executing `npm run-script sam`
2. Run tests by executing `npm test`
3. Stop `sam local` runtime when done, by running `npm run-script sam-stop`

## Installing required tools on Linux (e.g. CentOS, Fedora, Amazon Linux 2)

1. If not preinstalled, install and verify `git` by executing following lines: 
  ```bash
  $ sudo yum update -y
  $ sudo yum install git -y
  $ git --version
  ```

2. Install Node.js by executing the following lines: 
  ```bash
  $ curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
  ...
  $ sudo yum install nodejs -y
  ...
  Complete!
  $ node --version
  v12.16.1
  $ npm --version
  6.13.4
  ```

3. Install Gulpjs by executing the following lines: 
  ```bash
  $ sudo npm install --global gulp-cli
  $ gulp --version
  ```

4. Install AWS SAM CLI by following your OS specific steps as shown on 
[this page](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

For MacOS, the recommended route is to install using Homebrew. Here are the steps: 

Verify that Homebrew is installed:
```bash
$ brew --version
```

Follow these steps to install the AWS SAM CLI using Homebrew:
```bash
$ brew tap aws/tap
$ brew install aws-sam-cli
```

Verify the installation:
```bash
$ sam --version
```