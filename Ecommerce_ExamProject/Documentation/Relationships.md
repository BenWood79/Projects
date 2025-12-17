This is an explanation of the relationships between the tables.

CART:

Carts.associate = function (models) {
    Carts.belongsTo(models.Users,{ foreignKey: 'userId' } );
    Carts.belongsTo(models.Products,{ foreignKey: 'productId' } );

Each cart entry is linked to one user and one product

MEMBERSHIP:

Memberships.associate = function (models) {
    Memberships.belongsTo(models.Users)

Each membership is linked to one user.

ORDERS:

Orders.associate = function (models) {
    Orders.belongsTo(models.Users,{ foreignKey: 'userId' } );
    Orders.belongsTo(models.Products,{ foreignKey: 'productId' } );

Each order is placed by one user and is for one product.

ROLES:

Roles.associate = function (models) {
    Roles.hasMany(models.Users);

Each role can be assigned to many users.

USERS:

Users.associate = function (models) {
    Users.belongsTo(models.Roles);
    Users.belongsTo(models.Orders);
    Users.belongsTo(models.Memberships);

Each user belongs to one role, one order and one membership. 
The reasoning behind having one user per order was to make generating an order number more consise.