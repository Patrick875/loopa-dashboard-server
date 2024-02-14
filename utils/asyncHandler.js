module.exports = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			console.log(err);
			return res.status(500).json({
				status: "error",
				message: err.errors ? err.errors[0].message : err.message,
			});
		}
	};
};
