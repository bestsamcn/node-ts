import * as http from 'http';
import AppServer from './AppServer';


let appServer = AppServer.create('node-ts');
const httpServer:http.Server = http.createServer(appServer.app);
httpServer.listen(3000);
httpServer.on('error', e=>console.log(e, 'server error'));
httpServer.on('listening', ()=>console.log('port:'+4000));

// 热加载
if (module.hot) {

    //监听
    module.hot.accept('./AppServer.ts', () => {

        //如果有改动，就使用新的app来处理请求
        httpServer.removeListener('request', appServer.app);
        appServer = AppServer.create('node-ts');
        httpServer.on('request', appServer.app);
    });
}