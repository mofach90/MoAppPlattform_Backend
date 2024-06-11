import { Router } from "express";


export function registerApiRoutes(router:Router, prefix:string = ''):void {

    router.use(`${prefix}/check-auth`,createCheckAuthRoutes())
    router.use(`${prefix}/login`)

}