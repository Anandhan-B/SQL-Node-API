import jsonwebtoken from "jsonwebtoken";

const generateToken = (userID) => {
  return jsonwebtoken.sign(
    {
      userID,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "120m",
    }
  );
};


export default {
  generateToken,
};
