import {  Stack, StackProps, aws_codepipeline as codepipeline } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import LambdaDynamoDbStage from './lambda-dynamodb';
export class HackdayCdkLambdaDynamodbStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('phuwin95/hackday-cdk2-lambda-dynamodb', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      }),
      dockerEnabledForSelfMutation: true,
    });
    const myStage = new LambdaDynamoDbStage(this, 'LambdaDynamoDbStack');
    pipeline.addStage(myStage);

  }
}
