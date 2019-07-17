import * as http from 'http';
import app from './app';


let nodeApp = app();
const server:http.Server = http.createServer(nodeApp);
server.listen(3000);
server.on('error', e=>console.log(e, 'server erfrofdfr'));
server.on('listening', ()=>console.log(4000, 'port'));

// 热加载
if (module.hot) {

    //监听./app.ts
    module.hot.accept('./app.ts', () => {
    	console.log('update')

        //如果有改动，就使用新的app来处理请求
        server.removeListener('request', nodeApp);
        nodeApp = app();
        server.on('request', nodeApp);
    });
}