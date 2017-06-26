import * as l from 'aws-lambda';
import * as pg from 'pg';
import * as Sequelize from 'sequelize';
import * as Umzug from 'umzug';

const _ = pg; //typescript will ignore unused imports

const sequelize = new Sequelize(process.env.DATABASE_URL);

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: sequelize,
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor, // DataTypes
      ]
    },
    logging: function() {
      console.log.apply(null, arguments);
    }
});

export let handler: l.Handler = async (event: any, context: l.Context, callback: l.Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let migrations = await umzug.up();

  console.log(`Migrations ${migrations}`)

  const response = {
    statusCode: 200,
    body: JSON.stringify('ok')
  };
  return callback(undefined, response);
};
