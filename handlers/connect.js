function connect(req, res, next) {
	var body = req.body.config;

	// server config
	var config = {
		host: body.serverAddress,
		port: "1433",
		dialect: "mssql",
		userName: body.userName,
		password: body.password,
		database: body.database
	};

	new Promise(function (resolve, reject) {
		console.log("Promise part 1");
		var connection = new req.sql(config.database, config.userName, config.password, config);
		req.$scope.connection = connection;
		resolve(req.$scope.connection);
	}).then(function () {
		console.log("Promise part 2");
		return req.$scope.connection.authenticate()
			.then(() => {
				res.send('Connection has been established successfully.');
				req.$scope.connection.close();
			})
			.catch(err => {
				res.send(err.message);
			});
	});
}

module.exports = connect;
