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
yarn add serverless-transmogrify
```

## Usage

Define a migration handler function.

Pass the function as an option to the standard serverless deploy command

```
sls deploy --stage dev --function up
```

The function will be invoked after the deployment.  


## Configuration


### Define the Transmogrify handler

The plugin provides two built-in Migration Handlers:

- transmogrify.up
- transmogrify.down

These get mapped to the correct handler code at deploy time.

Required ENV variables:

- DATABASE_URL

It is strongly recommended that you make the migration endpoints private and add an api token to your configuration

### Sample Handler Configuration

The following defines a function handler called `up` mounted at the path `/up`.
The function handler is mounted into the same VPC and private subnet as the target RDS instance.

```
provider:
  name: aws

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
```



## Creating and Dropping Databases

Now at no extra charge!!
Databases can be created and dropped using Transmogrify as well via the `transmogrify.create` and `transmogrify.drop` handlers.

Best option is to invoke locally.

```
sls invoke --function create --path params.js --stage dev
```


The params.js file defines the database name
```
{
  "name": "test"
}
```



## Sanity Checking Your Database Connection

Connects via Sequelize and runs a noop check.

```
  check:
    handler: transmogrify.check
    timeout: 30
    environment:
      DATABASE_URL: ${self:custom.vars.database-url-${opt:stage}}
    vpc: ${self:custom.vpc}

```

Again, can be invoked locally:

```
sls invoke --function check  --stage dev
```
