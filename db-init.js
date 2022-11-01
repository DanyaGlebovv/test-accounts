/**
 * This file using just like template for initial creation tables in DB,
 * and after should be replacing with using sequelize.
 */
 const config = require('@ebdp1/config-lib');
 const pg = require('pg');
 const { host, port, username, password, database } = config.get('db');
 
 const connectionString = process.env.PGSERVER_URL || `postgresql://${username}:${password}@${host}:${port}/postgres`;
 const pool = new pg.Client(connectionString);
 pool.connect((err, client) => {
   if (err) {
     return console.error('error fetching client from pool', err);
   }
 
   let locale = null;
 
   if (/^win/.test(process.platform) && process.env.NODE_ENV !== 'test') {
     locale = '\'en-US\'';
   }
 
   const query = `CREATE DATABASE ${database} WITH 
     ENCODING 'UTF8' 
     LC_COLLATE=${locale || '\'en_US.utf-8\''}
     LC_CTYPE=${locale || '\'en_US.utf-8\''}
     TEMPLATE=template0 
     OWNER ${username};`;
 
   return client.query(query, (queryErr) => {
     if (queryErr) {
       console.log(`DB error on initialisation. ${JSON.stringify(queryErr)}`);
     }
     if (queryErr && queryErr.code !== '42P04') {
       throw (queryErr);
     } else {
       pool.end();
     }
     pool.end();
   });
 });
 
 pool.on('end', (err, result) => {
   if (err) {
     console.log(`DB error on end. ${JSON.stringify(err)}`);
     throw (err);
   } else {
     console.log(`DB successfully initialized. ${JSON.stringify(result)}`);
   }
 });
 