exports.profile = (req,res)=>{

    res.json({

        message:"Protected Resource",

        loggedInUser:req.user

    });

}
