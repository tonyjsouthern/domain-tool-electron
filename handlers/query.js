function query(req, res, next) {

	var body = req.body.config;
	var queryString = req.body.config.query;
	var split = queryString.split("select");
	var runQuery = req.body.config.query;

	// server config
	var config = {
		host: body.serverAddress,
		port: "1433",
		dialect: "mssql",
		userName: body.userName,
		password: body.password,
		database: body.database
	};

	new Promise((resolve, reject) => {
		var connection = new req.sql(config.database, config.userName, config.password, config);
		req.$scope.connection = connection;
		resolve(req.$scope.connection);
	}).then(function () {
		return req.$scope.connection.authenticate()
			.then(() => {
				console.log("Connection has been established successfully.");
			})
			.catch(err => {
				res.send(err.message);
			});
	}).then(function () {
		req.$scope.connection.query(runQuery).spread(function (results) {
			res.send(results);
		});
	});

}

module.exports = query;
