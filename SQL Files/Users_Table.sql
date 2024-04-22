
CREATE TABLE tbl_users(
UserID INT IDENTITY(1000,1) PRIMARY KEY,
UserName VARCHAR(100),
Gender VARCHAR(10),
PhoneNumber VARCHAR(20),
Interest NVARCHAR(500),
LastLogin VARCHAR(30),
IsActive BIT DEFAULT 1,
CreatedOn VARCHAR(30) DEFAULT FORMAT(GETDATE(), 'dd-MM-yyyy hh:mm:ss tt', 'en-IN')
)