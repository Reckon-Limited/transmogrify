# Transmogrify

Database migrations for AWS Lambda and RDS using Sequelize migrations.

## About

Allows you to easily create a lambda function inside your RDS VPC that will handle migrations for you.

The plugin will call the migration endpoint on deploy for you to run the migrations.


## Deployment

### Add Transmogrify config

If you know your service endpoint, you can bootstrap the config to your serverless file immediately by manually adding the stage and handler name to the endpoint.

```
transmogrify:
  up: https://7vksnlgb2k.execute-api.ap-southeast-2.amazonaws.com/dev/up
  token: egsrv6bvmtonm9wj91uswnqwtr1qwntwqbzsxftc  
```

In the above example:

- `dev` is the stage.
- `up` is the handler name
- `token` is an api gateway token required to access the handler

The token is optional but highly recommended. See below for details.

### Define the Transmogrify handler

Handlers:

- transmogrify.up
- transmogrify.down

Required ENV variables:

- DATABASE_URL


```
up:
  handler: transmogrify.up
  timeout: 30
  environment:
    DATABASE_URL: postgres://root:password@domain.rds.amazonaws.com:5432/Database
  vpc:
    securityGroupIds:
      - Fn::ImportValue: RDS-Shared-PostgreSQL-SecurityGroup
    subnetIds:
      - Fn::ImportValue: VPC-PrivateDataSubnet1
      - Fn::ImportValue: VPC-PrivateDataSubnet2
      - Fn::ImportValue: VPC-PrivateDataSubnet3
  events:
    - http:
        method: get
        path: /up
        private: true
```
