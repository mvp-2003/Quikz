const Feedback=require("../models/feedback")
const { StatusCodes } = require('http-status-codes');

const submitFeedback=async(req,res)=>{
    try{
        //Accept the feedback with the quizId and rating
        const {quizId}=req.params;
        const {
            rating,
            comments
        }=req.body;

        //If the rating is not a number then we can't store the feedback of the public
        if(rating===NaN)
            return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({"message":"Invalid rating input"});
        
        //Creation of new entry in feedback schema
        const feedback=await Feedback.create({
            userId:req.user.id,
            quizId,
            rating,
            comments
        });

        //If the feedback entry is not created. 
        if(!feedback)
            return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({"message":"Internal server error while creating new feedback entry"});

        return res
        .status(StatusCodes.CREATED)
        .json({
            "success":true,
            "message":"Feedback has been submitted"
        });
    }
    catch(error){
        console.log(`Error while submitting the feedback`, error);
        process.exit(1);
    }
}

const retrieveFeedbackBasedOnQuizId=async (req,res)=>{
    try{
        //Initially get the quiz ID to find the feedbacks for that particular quiz
        const {quizId}=req.params;

        //Find all the feedback that exists for this quiz
        const feedbacks=await Feedback.find({quizId:quizId});
        
        //If no feedbacks then return 
        if(!feedbacks.length){
            return res
                    .status(StatusCodes.NO_CONTENT)
                    .json({
                        "success":false,
                        "message":"No feedbacks exists for the given quiz."
                    });
        }

        return res
                .status(StatusCodes.OK)
                .json({
                    "success":true,
                    "message":"Feedback for a particular quiz",
                    "data":feedbacks,
                });
    }
    catch(error){
        console.log(`Error while retrieving the feedback`, error);
        process.exit(1);
    }

}

const retrieveFeedbackBasedOnUserId=async(req,res)=>{
    try{
        //Get the user id to find feedback given by the user 
        //The user info is stored in the jwt hence it is retrieved to req object in the middleware
        const userId=req.user.id;

        //Find all the feedbacks given by the user
        const feedbacks=await Feedback.find({userId:userId});
        

        if(!feedbacks.length){
            return res
                    .status(StatusCodes.NO_CONTENT)
                    .send("No Feedback exists that are given by the user.");
        }

        return res
                .status(StatusCodes.OK)
                .json({
                    "success":true,
                    "message":"Feeback given by the user",
                    "data":feedbacks
                });
    }
    catch(error){
        console.log(`Error while retrieving the feedback`, error);
        process.exit(1);
    }
}

module.exports={submitFeedback,retrieveFeedbackBasedOnQuizId,retrieveFeedbackBasedOnUserId};