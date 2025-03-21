const express = require('express');
const massive = require('massive');
const {router,srouter} = require('./routes');
const {checkPoint} = require('./checkpoint');
const cors = require('cors');
const HOST = 'localhost';
const PORT = 1234;
const mPORT = 5432;
massive({
	host: HOST,
	port: mPORT,
	database: 'addressbookdb',
	user: 'postgres',
	password: 'addressbookdb'
}).then((db)=>{
	const app = express();
	app.set('db',db);
	app.use(cors());
	app.use(express.json());
	app.use("/api",router);
	app.use(checkPoint);
	app.use("/api",srouter);
	app.listen(PORT,HOST,()=>console.log(`Runnin hot on ${HOST}:${PORT}`));
})