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

export let create: l.Handler = async (event: any, context: l.Context, callback: l.Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!event.name) {
    return callback(new Error('Name is required'), undefined);
  }

  let password = await Migration.create(event.name)

  return callback(undefined, `Created Database and User ${event.name} with password '${password}'`);
};


export let drop: l.Handler = async (event: any, context: l.Context, callback: l.Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!event.name) {
    return callback(new Error('Name is required'), undefined);
  }

  Migration.drop(event.name)

  return callback(undefined, `Dropped Database and User ${event.name}`);
};


let handler = async (fn: () => {}, callback: l.Callback) => {
  let results: any = await fn();

  let migrations = results.map( (m: {file: string}) => m.file);

  console.log(`Transmogrify Migrations: ${migrations}`)

  return callback(undefined, `ok: ${migrations}`);
};
