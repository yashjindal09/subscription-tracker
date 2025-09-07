import aj from "../config/arcjet.js";
const arjectmiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req,{requested: 1});
    if(decision.isDenied()){
      if(decision.reason.isBot()){return res.status(403).json({ message: 'Bots are not allowed' });}
      if(decision.reason.isRateLimit()){return res.status(429).json({ message: 'Too many requests, please try again later' });}
      if(decision.reason.isUnknown()){return res.status(403).json({ message: 'Unknown request' });}
    }
    next()

  } catch (error) {
    console.log('aj middleware error');
    next(error);
    
  }
}
export default arjectmiddleware;