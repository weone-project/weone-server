function errorHandler(err, req, res, next) {
    console.log(err);
    let [code, message] = [500, 'Internal server error']

    if (err.name == 'Password is required' ||
        err.name == 'Name is required' ||
        err.name == 'Email is required' ||
        err.name == 'Username is required' ||
        err.name == 'Email is required' ||
        err.name == 'Product Name is required' ||
        err.name == 'Description is required' ||
        err.name == 'Img Url is required' ||
        err.name == 'Price is required' ||
        err.name == 'Category Id is required'
    ) [code, message] = [400, err.name]
    if (err.name == 'Invalid email/password') [code, message] = [401, err.name]
    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') [code, message] = [400, err.errors[0].message]
    if (err.name == 'Testimony cannot be updated') [code, message] = [400, "Sorry,testimony can be edited only within two days or less"]
    if (err.name == 'Invalid token' || err.name == 'JsonWebTokenError') [code, message] = [401, 'Invalid token']
    // if (err.name == "You are not authorized") [code, message] = [403, err.name]
    if (err.name == "Data not found") [code, message] = [404, err.name]



    res.status(code).json({ message: message })
}


module.exports = errorHandler
