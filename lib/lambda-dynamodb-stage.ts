import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from "constructs";
import Stack from './lambda-dynamodb-stack';

export default class MyPipelineAppStage extends Stage {
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const stack = new Stack(this, 'LambdaDynamodbStack');      
    }
}