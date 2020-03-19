'use strict'

//const mocha = require('mocha');
const { assert } = require('chai'); 
const child_process = require('child_process');
const AWS = require('aws-sdk'); 

// ensure 'sam' lambda runtime is launched before running this test suite
// launch by calling 'sam local start-lambda &' from command line

describe('run and invoke lambda functions locally', () => {
  //suite.timeout(10000); // default is 2000, changing that to 10s

  AWS.config.sslEnabled = false; 
  AWS.config.signatureVersion = ''; 
  AWS.config.httpOptions = {timeout: 50000, connectTimeout: 50000}
  AWS.config.maxRetries = 0; 

  describe('check lambdas', () => {
    let lambda = new AWS.Lambda({
      endpoint: 'http://127.0.0.1:3001', 
      region: 'us-east-1'
    }); 

    it('GreetingsFunction should return a 200 response', async function() {

      let params = {
        FunctionName: 'GreetingsFunction', /* required */
        InvocationType: 'RequestResponse', 
        Payload: ''
      };

      await lambda.invoke(params, function(err, data) {
        assert.isNull(err, 'error returned in lambda.invoke()'); 
        assert.equal(data.StatusCode, 200, 'received 200 status code from GreetingsFunction'); 

        console.log('GreetingsFunction data: ' + data); 
      }).promise(); // important to get a promise here, so we can await on it      

      // NO done(); - Mocha does not expect a done() from an async function
    }); 

    it('HelloFunction should return a 200 response', async function() {
      let params = {
        FunctionName: 'HelloFunction', /* required */
        InvocationType: 'RequestResponse', 
        Payload: ''
      };

      await lambda.invoke(params, function(err, data) {
        assert.isNull(err, 'error returned in lambda.invoke()'); 
        assert.equal(data.StatusCode, 200, 'received 200 status code from HelloFunction'); 

        console.log('HelloFunction data: ' + data); 
      }).promise(); // important to get a promise here, so we can await on it      

      // NO done(); - Mocha does not expect a done() from an async function
    }); 
  })

}); 

/* 
  // sam local must be launched outside of Node.js process - following will not work

  var sam = null; 
  before('start SAM locally', async () => {
    sam = child_process.spawn('sam', ['local', 'start-lambda', '--host', 'localhost', 
      '-p', '3001', '--region', 'us-east-1']); 

    for await (const data of sam.stderr) {
      console.log(`stderr from child_process: ${data}`);
      if (data.includes('Running on')) {
        console.log('SAM is now running, continuing with test case execution...'); 
        break; 
      }
    };

    sam.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
  
    sam.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });
  
    sam.on('close', function(code) {
        console.log('closing process: ' + code);
    });
  }); 

  after('close SAM', () => {
    console.log('after called'); 
    if (sam) sam.kill(); 
  }); 

*/
