exports.register = (req, res) => {
    res.status(200).json({ message: "Register Endpoint" });
};

exports.login = (req, res) => {
    res.status(200).json({ message: "Login Endpoint" });
};
