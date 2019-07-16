import * as express from 'express';


const createApp = ()=>{
	const app = express();
	app.get('/', function (req, res) {
	  res.send('Hello Wodddrld')
	});
	return app;
};
export default createApp;