# An AWS Lambda Develop, Test and Depoy Pipeline

This project shows how to use tools such as AWS SAM, Gulp and Terraform to test and a couple 
of AWS Lambda functions. It also serves to demonstrate how one Lambda service can invoke another 
Lambda, using AWS SDK. 

## Tools Used

### Development tools used: 
* [Visual Studio Code](https://code.visualstudio.com) - Source code editor and IDE (free software 
from Microsoft)
* [Git](https://git-scm.com) - An open-source version control system (comes preinstalled in MacOS 
and many Linux distros)
* [Node.js]() - An open-source Javascript runtime environment for server-side applications
* [Gulp](https://gulpjs.com) - An open-source Javascript based build tool 

### Testing tools used: 
* [AWS SAM](https://aws.amazon.com/serverless/sam/) - AWS Serverless Application Model (SAM) is 
an open-source framework for building and testing serverless applications

### Deployment tools used: 
* [Terraform](https://www.terraform.io) - An open source infrastructure as code (IaC) tool


## Installing AWS SAM CLI
Source: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html

Verify that Homebrew is installed:
```
brew --version
```

Follow these steps to install the AWS SAM CLI using Homebrew:
```
brew tap aws/tap
brew install aws-sam-cli
```

Verify the installation:
```
sam --version
```

# Initialize SAM project
