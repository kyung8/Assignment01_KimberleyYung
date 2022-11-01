

//Next time an assignment is due please don't lock me out of the content up to the day OF the assignment being due. 
import passport from "passport";
import userModel from '../../models/users.js';
import { GenerateToken } from "../../routes/utils/index.js";

export function processLogin(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        // are there any errors?
        if(err){
            console.error(err);
            res.end(err);
        }

        // are there any login errors?
        if(!user){
            return res.json({
                success: false,
                msg: 'ERROR: Authenticatoin Failed'
            })
        }

        req.logIn(user, (err) => {
            // are there any errors?
            if(err){
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);

            return res.json({
                success: true, 
                msg: 'User Logged In Successfully',
                user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    emailAddress: user.emailAddress
                },
                token: authToken
            })
        })
    })(req, res, next);
}

export function processRegistration(req, res, next){
    let newUser = new userModel({
        ...req.body
    });

    console.log(newUser);

    userModel.register(newUser, req.body.password, (err) => {
        if(err){
            console.error(err);           

            return res.json({
                success: false,
                msg: 'Error Registration Failed'
            });
        }

        //all ok

        return res.json({
            success: true,
            msg: 'User Registered Successfully'
        });
    })
}

export function processLogout(req, res, next){
    req.logOut((err) => {
        if(err){
            console.error(err);
            res.end(err);
        };
    });

    res.json({
        success:true,
        msg: 'User logged out successfully'
    })
}