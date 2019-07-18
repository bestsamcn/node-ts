import { Path, GET, DELETE, POST, PUT, PathParam, QueryParam, HeaderParam, CookieParam, FormParam, Response } from 'express-decorator';

declare class User{
	public name:string;
	public age:number
}

@Path('/user', [ testMidware2 ])
export class UserService {

	/**
	 * @param id userid
	 * @param name username
	 */

    @GET('/:id', [ testMidware1 ])
    list( @PathParam('id') id: string, @QueryParam('name') name: string) {
        return [id, name]
    }

    @DELETE('/:id')
    delete( @PathParam('id') id:string) {
        return [id];
    }

    @POST('')
    create( @FormParam('user') user:any) {
        return user;
    }

    @PUT('')
    update( @FormParam('user') user:User, @Response response:any) {

        return response.send(user);
    }

    @GET('/test/cookie')
    testCookie( @CookieParam('name') p1:string, @CookieParam('xx') p2:string) {

        return Promise.resolve([p1, p2]);
    }

    @GET('/test/header')
    testHeader( @HeaderParam('Cookie') p1:string, @HeaderParam('User-Agent') p2:string) {

        return Promise.resolve([p1, p2]);
    }
} 

// midware
function testMidware1(req:any, res:any, next:any) {
	console.log(res, 'dddddd')
    req.body.test1 = "test1"
    next();
}

function testMidware2(req:any, res:any, next:any) {
	console.log(res, 'dddddd')
    req.body.test2 = "test2"
    next();
}