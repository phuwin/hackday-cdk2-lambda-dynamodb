import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { join } from 'path';

export default class CdkStarterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myFunction = new NodejsFunction(this, 'my-function', {
      memorySize: 256,
      timeout: Duration.seconds(5),
      runtime: Runtime.NODEJS_14_X,
      handler: 'main',
      entry: join(__dirname, `/../src/my-lambda/index.ts`),
    });


    const table = new Table(this, 'Table', {
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      tableName: 'phu-test-table',
    });

    table.addGlobalSecondaryIndex({
      indexName: 'gsi',
      partitionKey: { name: 'sk', type: AttributeType.STRING },
      sortKey: { name: 'pk', type: AttributeType.STRING },
    })

    table.grantReadWriteData(myFunction);
  }
}