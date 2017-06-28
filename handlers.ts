import * as l from 'aws-lambda';
import { Migration } from './migration'

export let up: l.Handler = async (event: any, context: l.Context, callback: l.Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(Migration.up, callback);
};

export let down: l.Handler = async (event: any, context: l.Context, callback: l.Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return handler(Migration.down, callback);
};

let handler = async (fn: () => {}, callback: l.Callback) => {
  let migrations = await fn();

  console.log(`Transmogrify Migrations: ${migrations}`)

  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify('ok')
  // };
  return callback(undefined, 'ok');
};
