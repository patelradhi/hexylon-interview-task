const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const { ResourceConflict, UnAuthenticatedError, NotFoundError, ValidationError } = require("../utils/errors");
const { v4: uuidv4 } = require("uuid");
const Redis = require("../utils/lib/redis");
const redisClient = new Redis();

const registerUser = ({ createSuccessResponse }) => {
  return async (req, res, next) => {
    try {
      const { name, email, password, board, field, standard, date_of_birth } = req.body;

      if (!name || !email || !password || !board || !field || !standard || !date_of_birth) {
        throw new ValidationError("All fields are required", {
          name: !name ? "Name is required" : null,
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
          board: !board ? "Board is required" : null,
          field: !field ? "Field is required" : null,
          standard: !standard ? "Standard is required" : null,
          date_of_birth: !date_of_birth ? "Date of birth is required" : null
        });
      }

      // Check if user exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        throw new ResourceConflict("Email already registered");
      }

      // Calculate age from DOB
      const age = Math.floor((new Date() - new Date(date_of_birth)) / 31557600000);

      // Hash password
      const password_hash = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        email,
        password_hash,
        board,
        field,
        standard,
        date_of_birth,
        age
      });

      createSuccessResponse(201, { user }, res);
    } catch (error) {
      next(error);
    }
  };
};

const loginUser = ({ createSuccessResponse }) => {
  return async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new UnAuthenticatedError("Invalid credentials");
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new UnAuthenticatedError("Invalid credentials");
      }

      // Create session
      const sessionId = uuidv4();
      await redisClient.set(
        sessionId,
        JSON.stringify({ user: { id: user.id, email: user.email } }),
        86400 // 24 hours
      );

      // Set session cookie
      res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        maxAge: 86400000 // 24 hours
      });

      createSuccessResponse(200, { message: "Login successful" }, res);
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = ({ createSuccessResponse }) => {
  return async (req, res, next) => {
    try {
      const {
        user: { id, email }
      } = req.user;

      const updateData = { ...req.body };

      if (updateData.password) {
        updateData.password_hash = await bcrypt.hash(updateData.password, 10);
        delete updateData.password;
      }

      if (updateData.email) {
        const existingUser = await UserModel.findByEmail(updateData.email);
        if (existingUser && existingUser.id !== id) {
          throw new ResourceConflict("Email already in use");
        }
      }

      if (updateData.date_of_birth) {
        updateData.age = Math.floor((new Date() - new Date(updateData.date_of_birth)) / 31557600000);
      }

      const updatedUser = await UserModel.update(id, updateData);

      if (!updatedUser) {
        throw new NotFoundError("User not found");
      }

      createSuccessResponse(200, { user: updatedUser }, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  registerUser,
  loginUser,
  updateUser
};
