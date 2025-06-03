// hello-world-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface HelloWorldStackProps extends cdk.StackProps {
  api: apigw.SpecRestApi;
}

export class HelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: HelloWorldStackProps) {
    super(scope, id, props);

    new apigw.SpecRestApi(this, 'HelloWorldApi', {
      apiDefinition: apigw.ApiDefinition.fromAsset('openapi-hello.yaml'), // OpenAPI with /hello route
      restApiName: props.api.restApiName,
      mode: apigw.RestApiMode.MERGE,
    });
  }
}

