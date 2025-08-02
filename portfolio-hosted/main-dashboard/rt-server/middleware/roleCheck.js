

import { isAdmin } from "../utils/auth/roles.js";

function adminOnly(req,res,next) {
    if(!isAdmin(req.user)) return res.status(401).json({message: "Admins only"})
    next()
}




export default adminOnly