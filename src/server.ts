import * as dotenv from "dotenv"
dotenv.config()

import express, { NextFunction, Request, Response } from "express"
import note from "./route/note"
import bodyParser from "body-parser"
import passport from "passport"
import cors from "cors"
import sessions from "express-session"
import { Strategy as GitHubStrategy } from "passport-github2"
import prisma from "./service/common/prisma"

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use("/note", note)

const port = process.env.API_PORT || 3000

app.use(passport.initialize())
// app.use(passport.session())

app.use(
  sessions({
    secret: "SOME_SECRET_RANDOM_KEY",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // make sure to change this to true on production code
  })
)

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj: any, done) {
  done(null, obj)
})

const clientId = process.env.CLIENT_ID || "",
  clientSecret = process.env.CLIENT_SECRET || "",
  callbackUrl =
    process.env.CALLBACK_URL ||
    "http://localhost:3000/auth/github/login/callback"

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(
  new GitHubStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
      scope: ["user:email"],
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // asynchronous verification, for effect...
      process.nextTick(() => {
        console.log(profile)
        prisma.user.create({
          data: {
            username: profile.username,
            email: profile.emails[0].value,
            githubId: profile.id,
          },
        })
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile)
      })
    }
  )
)

// GET /auth/github/login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get("/auth/github/login", passport.authenticate("github"))

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/auth/github/login/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // res.redirect("/")
    res.json({ message: "skadoosh" })
  }
)

// GET /auth/github/callback
// This is for github authorization to callback with authorization code
app.get("/auth/github/callback", ensureAuthenticated, async (req, res) => {
  console.log(req)
  const { code } = req.query
  const options = {
    code,
  }

  res.json(options)

  // try {
  //   const accessToken = await githubClient.getToken(options)

  //   // Save token to user session for future use
  //   req.user.accessToken = accessToken.token
  //   return res.redirect(req.session.redirect)
  // } catch (error) {
  //   console.error("Access Token Error", error.message)
  //   return res.status(500).json("Authentication failed")
  // }
})

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next()
  }
  /** @todo handle auth error **/
  res.json({ error: "auth error" })
}

app.listen(port, () =>
  console.log(`Demo Content API is running at http://localhost:${port}`)
)
