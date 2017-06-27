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

export let Migration = umzug;
