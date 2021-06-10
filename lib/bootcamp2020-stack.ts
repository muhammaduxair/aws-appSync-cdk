import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";

export class Bootcamp2020Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // appsync API gives you a graphql api with api key
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: "myFirstAppsyncAPI",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"), ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, ///Defining Authorization Type
        },
      },
    });

    ///Lambda Fucntion
    const lambda_function = new lambda.Function(this, "LambdaFucntion", {
      runtime: lambda.Runtime.NODEJS_12_X, ///set nodejs runtime environment
      code: lambda.Code.fromAsset("lambda"), ///path for lambda function directory
      handler: "index.handler", ///specfic fucntion in specific file
    });

    ////Set lambda as a datasource
    const lambda_data_source = api.addLambdaDataSource(
      "lamdaDataSource",
      lambda_function
    );

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "hello",
    });
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "age",
    });
    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "title",
    });

    ///Print Graphql Api Url on console after deploy
    new cdk.CfnOutput(this, "APIGraphQlURL", {
      value: api.graphqlUrl,
    });
    ///Print API Key on console after deploy
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });
  }
}
