import User from "../models/user.model.js"; 

export const getusers  = async (req,res,next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

export const getuser = async (req,res,next) => {
  try {
    const user = await User.findById(req.params.id).select('-password ');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
}