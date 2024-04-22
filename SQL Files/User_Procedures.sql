CREATE PROCEDURE SP_AllUsers
AS
SELECT * FROM tbl_users;

GO

CREATE PROCEDURE SP_Login 
@phone_no VARCHAR(20), @status VARCHAR(10) OUTPUT, @message VARCHAR(100) OUTPUT,@userID INT OUTPUT
AS
BEGIN
 DECLARE @RowCount INT;
 SELECT @RowCount=COUNT(*) FROM tbl_users WHERE PhoneNumber = @phone_no;
 IF @RowCount > 0
	BEGIN
		SET @status = 'L';
		SET @message = 'Login Successfull';
		SELECT @userID = UserID  FROM tbl_users WHERE PhoneNumber = @phone_no;
		UPDATE tbl_users SET LastLogin = FORMAT(GETDATE(), 'dd-MM-yyyy hh:mm:ss tt', 'en-IN') WHERE UserID = @userID;
	END
 ELSE
	BEGIN
		INSERT INTO tbl_users(PhoneNumber) VALUES(@phone_no);
		SET @status = 'I';
		SET @message = 'Inserted Successfully';
		SELECT @userID = UserID  FROM tbl_users WHERE PhoneNumber = @phone_no;
	END

END

GO

CREATE PROCEDURE SP_SetName 
@userID INT,@userName VARCHAR(100),@status VARCHAR(10) OUTPUT, @message VARCHAR(100) OUTPUT
AS
BEGIN
	UPDATE tbl_users SET UserName = @userName WHERE UserID = @userID;
	SET @status = 'I';
	SET @message = 'Inserted Successfully';
END

GO
CREATE PROCEDURE SP_SetGender 
@userID INT,@gender VARCHAR(10),@status VARCHAR(10) OUTPUT, @message VARCHAR(100) OUTPUT
AS
BEGIN
	UPDATE tbl_users SET Gender = @gender WHERE UserID = @userID;
	SET @status = 'I';
	SET @message = 'Inserted Successfully';
END

GO

CREATE PROCEDURE SP_SetInterest 
@userID INT,@interest NVARCHAR(500),@status VARCHAR(10) OUTPUT, @message VARCHAR(100) OUTPUT
AS
BEGIN
	UPDATE tbl_users SET Interest = @interest,LastLogin = FORMAT(GETDATE(), 'dd-MM-yyyy hh:mm:ss tt', 'en-IN') WHERE UserID = @userID;
	SET @status = 'I';
	SET @message = 'Inserted Successfully';
END

GO

CREATE PROCEDURE SP_UserData
@userID INT, @status VARCHAR(10) OUTPUT
AS
BEGIN
	DECLARE @RowCount INT;
	SELECT @RowCount=COUNT(*) FROM tbl_users WHERE UserID = @userID;
 IF @RowCount > 0
	BEGIN
		SET @status = 'S';
		SELECT UserName, Gender, PhoneNumber, Interest  FROM tbl_users WHERE UserID = @userID;
	END
 ELSE
	BEGIN
		SET @status = 'N';
	END
END

GO