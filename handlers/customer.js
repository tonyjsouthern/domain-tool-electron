function customer (req, res, next){

  var runQuery = `select customername, domainname, sqlconnectstring from customer where processactive = 1`

  var config = {
    host: process.env.DB_HOST,
    port: "1433",
    dialect: "mssql",
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };

  var connection = new req.sql(config.database, config.userName, config.password, config);

  req.$scope.connection.query(runQuery).spread(function (results) {
    res.send(results);
  })
  .catch( (error) => {
    res.send(error);
  })

}

module.exports = customer;
