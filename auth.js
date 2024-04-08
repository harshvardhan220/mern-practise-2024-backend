import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; //Username and Password Strategy.
import BlogPost from "./models/BlogPost.js";

passport.use(
  //Dont change sequence of parameters.
  new LocalStrategy(async (username, password, done) => {
    //Authentication Logic Here
    try {
      const user = await BlogPost.findOne({ username: username }); //I am assuming blogpost as user with username and pass. Just for authentication implementation purpose.
      console.log(user);
      if (!user) {
        done(null, false, { message: "incorrect username" });
      }

      const isPasswordMatch = await user.comparePassword(password); //FIXME: comparePassord method is created in BlogPost model file.
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password." });
      }
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
