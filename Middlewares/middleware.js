import jsonwebtoken from 'jsonwebtoken';
import sql from 'mssql'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
       return res.status(401).send("missing token")
    }

    const token = authHeader.split(" ")[1];

    jsonwebtoken.verify(token, process.env.SECRET_KEY,async (err,decode)=>{
        if(err){
            return res.status(403).send(`Token error: ${err.message}`)
        }
        const request = new sql.Request
        const userData = await request
        .input("userID", sql.Int,decode.userID)
        .output("status", "")
        .execute("SP_UserData");
      if (userData.output.status === "N") {
        return res.status(401).send("Invalid User");
      }
      else if (userData.output.status === "S") {
        req.user = userData.recordset[0];
        next();
      }
      
    })
}

  export default {
    verifyToken,
  }