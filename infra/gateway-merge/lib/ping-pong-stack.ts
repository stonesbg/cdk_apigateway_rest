// ping-pong-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface PingPongStackProps extends cdk.StackProps {
  api: apigw.SpecRestApi;
}

export class PingPongStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PingPongStackProps) {
    super(scope, id, props);

    new apigw.SpecRestApi(this, 'PingPongApi', {
      apiDefinition: apigw.ApiDefinition.fromAsset('openapi-pingpong.yaml'), // OpenAPI with /ping route
      restApiName: props.api.restApiName,
      mode: apigw.RestApiMode.MERGE,
    });
  }
}

