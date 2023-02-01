// function errorHandler(err, req, res, next) {
//     let statusCode = 500
//     let message = 'Internal server error'
//     switch (err.name) {
//         case "SequelizeUniqueConstraintError":
//         case "SequelizeValidationError":
//             statusCode = 400
//             message = err.errors.map(msg => {
//                 return msg.message
//             })
//             break;
//         case "DATA NOT FOUND":
//             statusCode = 404
//             message = 'data Not Found'
//             break;
//         case "invalid_credentials":
//             statusCode = 401
//             message = 'invalid username or password'
//             break;
//         case "JsonWebTokenError":
//             statusCode = 401
//             message = 'Please Login First'
//             break;
//         case "Forbidden":
//             statusCode = 403
//             message = "You don't have access"
//             break;
//         case "bad_request":
//             statusCode = 400
//             message = "Please input your email or password"
//             break;
//         case "Unauthorized":
//             statusCode = 403
//             message = "Please Login First"
//             break;
//         case "alreadyPaid":
//             statusCode = 400
//             message = `You've already puchase the official fans`
//     }

//     res.status(statusCode).json({ message })
// }

function errorHandler(err, req, res, next) {
    console.log(err);
    let [code, message] = [500, 'Internal server error']

    if (err.name == 'Password is required' || err.name == 'Email is required' || err.name == 'Username is required') [code, message] = [400, err.name]
    if (err.name == 'Invalid email/password' || err.name == "This player already in your favorite list" || err.name == "You already in Pro membership") [code, message] = [401, err.name]
    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') [code, message] = [400, err.errors[0].message]
    if (err.name == 'Invalid token' || err.name == 'JsonWebTokenError') [code, message] = [401, 'Invalid token']
    if (err.name == "You are not authorized") [code, message] = [403, err.name]
    if (err.name == "User not found" || err.name == "Player not found" || err.name == "You already in Pro membership" || err.name == "Image Profile required" )[code, message] = [404, err.name]



    res.status(code).json({ message: message })
}


module.exports = errorHandler
