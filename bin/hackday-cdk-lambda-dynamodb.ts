import { App } from 'aws-cdk-lib';
import { HackdayCdkLambdaDynamodbStack } from '../lib/hackday-cdk-lambda-dynamodb-stack';

const app = new App();
new HackdayCdkLambdaDynamodbStack(app, 'HackdayCdkLambdaDynamodbStack', {
  env: { account: '124768067502', region: 'eu-west-1' },
});
app.synth();
