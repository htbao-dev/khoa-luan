const User = require("../models/User");

class UserController {
    getFriends(req, res, next) {
        const keySearch = req.query.keySearch;
        User.find({
            $or: [
                { username: { $regex: keySearch, $options: "i" } },
                { name: { $regex: keySearch, $options: "i" } },
            ],
        })
            .then((users) => {
                users.forEach((user) => {
                    user.password = undefined;
                    user.refreshToken = undefined;
                });
                res.json(users);
            })
            .catch((err) => {
                next(err);
            }
        );
    } 
}

module.exports = new UserController();
