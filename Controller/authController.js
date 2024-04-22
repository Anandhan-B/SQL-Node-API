import sql from "mssql";
import utils from "../Utils/utils.js";


async function getAllUsers(req, res) { // For Testing
  try {
    const result = await sql.query`EXEC SP_AllUsers`;
    res.send(result.recordset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function login(req, res) {
  try {
    const { phoneNo } = req.body;
    if (!phoneNo) return res.status(404).send("missing data");
    const request = new sql.Request();
    const result = await request
      .input("phone_no", phoneNo)
      .output("status", "")
      .output("message", "")
      .output("userID", sql.Int, 0)
      .execute("SP_Login");
    if (result.output.status === "I") {
      return res.send(result.output);
    }
    if (result.output.status === "L") {
      return res.json({
        status: "L",
        message: result.output.message,
        token: utils.generateToken(result.output.userID),
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function setName(req, res) {
  try {
    const { userID, userName } = req.body;
    if (!(userID && userName))
      return res.status(404).send("missing required data");
    const request = new sql.Request();
    const result = await request
      .input("userID", sql.Int, userID)
      .input("userName", userName)
      .output("status", "")
      .output("message", "")
      .execute("SP_SetName");
    if (result.output.status === "I") {
      return res.send(result.output);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function setGender(req, res) {
  try {
    const { userID, gender } = req.body;
    if (!(userID && gender))
      return res.status(404).send("missing required data");
    const request = new sql.Request();
    const result = await request
      .input("userID", sql.Int, userID)
      .input("gender", gender)
      .output("status", "")
      .output("message", "")
      .execute("SP_SetGender");
    if (result.output.status === "I") {
      return res.send(result.output);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

async function setInterest(req, res) {
  try {
    const { userID, interest } = req.body;
    if (!(userID && interest))
      return res.status(404).send("missing required data");
    const request = new sql.Request();
    const result = await request
      .input("userID", sql.Int, userID)
      .input("interest", sql.NVarChar, interest)
      .output("status", "")
      .output("message", "")
      .execute("SP_SetInterest");
    if (result.output.status === "I") {
      return res.json({
        status: "I",
        message: result.output.message,
        token: utils.generateToken(userID),
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

//Just For Check Middleware Works Properly
async function secret(req,res){ 
  res.send(req.user)
}

export default {
  getAllUsers,
  login,
  setName,
  setGender,
  setInterest,
  secret
};
