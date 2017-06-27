# Transmogrify

Database migrations for AWS Lambda and RDS using [Sequelize Migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html).

## About

Allows you to easily create a lambda function inside your RDS VPC that will handle migrations for you.

The plugin will call the migration endpoint on deploy for you to run the migrations.

## Migrations

The plugin assumes that migration files live in a `migrations` directory inside your project.

For details on using migrations please see the [Sequelize Migration](http://docs.sequelizejs.com/manual/tutorial/migrations.html) docs.


## Deployment

Installation

```
yarn add transmogrify
```

## Configuration


### Add Transmogrify config

If you know your service endpoint, you can bootstrap the config to your serverless file immediately by manually adding the stage and handler name to the endpoint.

```
transmogrify:
  up: https://7vksnlgb2k.execute-api.ap-southeast-2.amazonaws.com/dev/up
  token: egsrv6bvmtonm9wj91uswnqwtr1qwntwqbzsxftc  
```

In the above example:

- `dev` is the stage.
- `up` is the path to the handler defined in your API Gateway event config
- `token` is an api gateway token required to access the handler

The token is optional but highly recommended. See below for details.

### Define the Transmogrify handler

Handlers:

- transmogrify.up
- transmogrify.down

Required ENV variables:

- DATABASE_URL

It is strongly recommended that you make the migration endpoints private and add an api token to your configuration

### Sample Handler Configuration

The following defines a function handler called `up` mounted at the path `/up`.
The function handler is mounted into the same VPC and private subnet as the target RDS instance.

```
provider:
  name: aws
  apiKeys:
    - transmogrify

plugins:
  - transmogrify

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


### First Deployment

If this is your first deploy of your serverless project, you will need to do the initial deployment in two steps.

  1. Define the handler as above
  2. Deploy
  3. Capture the API Key and Endpoint information
  4. Add the transmogrify config as above
  5. Deploy

Transmogrify will not attempt to call the migration webhook unless configuration is defined, so the initial deploy will set up the Resources in your stack, and the second deployment will call the migration handler.
