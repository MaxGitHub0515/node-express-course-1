

// SWITCHING FORM LOCALSTORAGE TO HTTPONLY
// CREATING ROUTE FOR THAT



import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    });
});


export default router;
