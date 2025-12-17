Users:

- Full Name
- Class Name
- Username
- Encyrpted Password
- Salt

Model = id, fullName, userName, encryptedPassword, salt

Roles:

- Admin: can edit orders, prices, names of stock, amount of stock, amount of valuta and users' credentials
- User: buy and sell stock with valuta and has a set starting amount for investment

Model = id, admin, user, role

Stock:

- Wood gaming
- Kim's sportsbar
- Vicktoria's ... tbd
- Flyden Fluids
- Alex's .... tbd

Model = id, name, priceIndex

Changes in value (optional):

- Record of all changes in value from initialisation to completion

Model = id, stockName, oldValue, updatedValue, date-added, 

INFORMATION IN TABLES ON THE FRONTEND NEEDS TO BE ADDED DYNAMICALLY FROM THE DATABASE - The existing tables are a mock up format.

- startupStocks.json needs to correspond with the outlined stocks in the project content (current date: 24.07.2025 - it does not)!

- Uncertain as to whether populating the database with a fileReadSync function or an endpoint init function is best? 