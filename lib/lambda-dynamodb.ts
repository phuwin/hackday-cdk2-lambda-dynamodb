import { Duration, Stage, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';

export default class CdkStarterStack extends Stage {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myFunction = new NodejsFunction(scope, 'my-function', {
      memorySize: 256,
      timeout: Duration.seconds(5),
      runtime: Runtime.NODEJS_14_X,
      handler: 'main',
      entry: join(__dirname, `/../src/my-lambda/index.ts`),
    });
  }
}