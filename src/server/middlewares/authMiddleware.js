

module.exports = function(req,res,next) {
    try{
       //Logic For Autheticating a user if autheticated then next else catch error and stop here
       next();
    }
    catch(error){
      res.send({
        message: error.message,
        data: error,
        success: false
      })
    }
}