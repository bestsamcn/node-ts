import * as express from 'express';


const createApp = ()=>{
	const app = express();
	app.get('/', function (req, res) {
	  res.send('Hello w')
	});
	return app;
};
export default createApp;