#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiGatewayStack } from "../lib/gateway-stack"
import { HelloWorldStack } from "../lib/hello-world-stack"
import { PingPongStack } from "../lib/ping-pong-stack" 

const app = new cdk.App();

const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack');

new HelloWorldStack(app, 'HelloWorldStack', {
  api: apiGatewayStack.api,
});

new PingPongStack(app, 'PingPongStack', {
  api: apiGatewayStack.api,
});
