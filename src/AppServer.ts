import * as express from 'express';
import { UserService } from './controllers/UserController';
import { RegisterService } from 'express-decorator';



class AppServer {

	/**
	 * app name
	 * @type {string}
	 */
	public name:string;
	public app:any;

	/**
	 * AppServer
	 * @param name app name
	 */
	private constructor(name:string) {
		this.app = express();
		this.name = name;
		this.initController();
		this.init();	
	}
	public init(){
		this.app.get('/', (req:any, res:any)=>{
			console.log(req, 'req')
			res.send('hello world');
		});
	}
	private initController(){
		RegisterService(this.app, [UserService]);
	}
	public static create(name:string):AppServer{
		return new AppServer(name);
	}
}

export default AppServer;
