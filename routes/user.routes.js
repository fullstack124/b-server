import { getUser, signInUser, userRegister } from "../controller/user.controller.js"
import { userMiddleware } from "../middleware/user.middleware.js";

export default (app)=>{
    app.post('/user/register',userRegister);
    app.post('/user/login',signInUser);
    app.get('/user/users',userMiddleware,getUser);
}