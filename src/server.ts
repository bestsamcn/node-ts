import * as http from 'http';
import app from './app';


const server:http.Server = http.createServer(app);


server.listen(4000);
server.on('error', (error:any)=>{console.log(error)});
server.on('listening', ()=>console.log('300'));

 interface module {
     hot: any
 }

// 热加载
if (module.hot) {
    // 监听./app.ts
    module.hot.accept('./app.ts', () => {
        // 如果有改动，就使用新的app来处理请求
        server.removeListener('request', app);

        server.on('request', app);
    });
}