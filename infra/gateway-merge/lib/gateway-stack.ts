// api-gateway-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as apigw from 'aws-cdk-lib/aws-apigateway';

export class ApiGatewayStack extends cdk.Stack {
  public readonly api: apigw.SpecRestApi;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.api = new apigw.SpecRestApi(this, 'BaseApi', {
      apiDefinition: apigw.ApiDefinition.fromAsset('openapi-base.yaml'), // minimal OpenAPI spec
      restApiName: 'MergedApiGateway',
      mode: apigw.RestApiMode.MERGE,
      endpointTypes: [apigw.EndpointType.REGIONAL],
    });


    const apiGatewayDeployment = new apigw.Deployment(this, 'ApiGatewayDeployment', {
      api: this.api
    });

    const stage = new apigw.Stage(this, 'ExampleV1', {
      stageName: 'v1',
      deployment: apiGatewayDeployment,
    });
  }
}

