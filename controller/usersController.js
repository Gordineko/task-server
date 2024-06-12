const ApiError = require("../apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const generateJwt = (
  id,
  email,
  password,
  role,
) => {
  return jwt.sign(
    {
      id,
      email,
      password,
      role,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
};
class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      const customers = users.filter((user) => {
        return user.role === "USER";
      });

      return res.json(customers);
    } catch (error) {
      next(error);
    }
  }
  async registration(req, res, next) {
    const {
      email,
      password,
      role,
    } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Не вірний Email або Password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("юзер з таким email вже існує"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashPassword,
      role,
      
    });
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
    );

    return res.json({ token });
  }

  async login(req, res, next) {
    const {
      email,
      password,
    } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal1("Користувача не знайдено"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal1("пароль не вірний"));
    }

    if (user.role !== "USER") {
      return next(ApiError.internal1("Доступ не дозволено"));
    }

    const token = generateJwt(
      user.id,
      user.email,
      user.role,
    );
    return res.json({ token });
  }
  
}

module.exports = new UserController();
