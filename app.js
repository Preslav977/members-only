require("dotenv").config();
const nconf = require("nconf");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const User = require("./models/user");

// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const membersOnlyRouter = require("./routes/members-only");
const Message = require("./models/message");

const app = express();

app.use(compression());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self", "code.jquery.com", "cdn.jsdelvr.net"],
    },
  }),
);

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

app.use(limiter);

const mongoDB = process.env.mongoURL;
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.get(
  "/",
  asyncHandler(async (req, res) => {
    const messages = await Message.find().populate("user").exec();
    res.render("index", { user: req.user, messages });
  }),
);

app.post(
  "/",
  asyncHandler(async (req, res) => {
    await Message.findByIdAndDelete(req.body.id);
    res.redirect("/");
  }),
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.resolve("./public")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", membersOnlyRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
