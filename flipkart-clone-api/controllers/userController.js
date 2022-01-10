const UserModal = require('../models/userModel');
const crypto = require('crypto');

saveUser = async (req, res) => {

    let reqData = req.body;
    let validationError = [];

    if(!reqData.first_name) {
        validationError.push('First Name');
    }

    if(!reqData.last_name) {
        validationError.push('Last Name');
    }
    
    if(!reqData.email) {
        validationError.push('Email');
    }
    
    if(!reqData.password) {
        validationError.push('Password');
    }

    if(validationError.length > 0) {
        let validation_msg = validationError.join(', ');
        return res.status(200).send({
            status: 'fail',
            message: 'Required ' + validation_msg +' fields.',
            data: {}
        });
        // commonFunc.send(res,400,'',`Required ${validation_msg} fields.`);
        // return;
    }

    // check email already exits or not
    let userCount = await UserModal.where({ 'email': reqData.email }).countDocuments();
    if(userCount > 0) {
        return res.status(200).send({
            status: 'fail',
            message: 'Email already exits.',
            data: {}
        });
    }

    const hashPassword = getHash(reqData.password.trim());

    var userData = {
        first_name:   reqData.first_name.trim(), 
        last_name:   reqData.last_name.trim(), 
        email:       reqData.email.trim(), 
        password:    hashPassword,
    };
    
    let userModelObject = new UserModal(userData); 

    userModelObject.save()
        .then( (result) => {
            return res.status(200).send({
                status: 'success',
                message: 'Data saved successfully.',
                data: result
            });
        })
        .catch( (error) => {
            console.log(error);
            return res.status(200).send({
                status: 'fail',
                message: 'Unable save data, please try later.',
                data: {}
            });
        });
};

loginUser = async (req, res) => {
    // find user
    let reqBody = req.body;
    console.log(reqBody, 'reqBody');
    
    let userDetails = await UserModal.findOne({ email: reqBody.email }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.status(200).send({status: 'fail', message: 'Account not found', data: {}});
    }
    if ( userDetails.password !== getHash(reqBody.password) ) {
        res.status(200).send({status: 'fail', message: 'Email or password is invalid', data: {}});
    }

    let userData = {
        _id: userDetails._id,
        first_name: userDetails.first_name, 
        last_name: userDetails.last_name,
        email: userDetails.email
    };

    res.status(200).json({ status: 'success', message: "User found", data: userData});

};

// update user data based on email
updateUser = async (req, res) => {

    let reqData = req.body;
    let reqParams = req.params;

    if (Object.keys(reqData).length <= 0) {
        return res.status(200).send({
            status: 'fail',
            message: 'Please provide required data',
        });
    }

    let filter = { _id: reqParams.id };

    let update = {
        first_name: reqData.first_name.trim(),
        last_name: reqData.last_name.trim()
    };

    let options = {
        new: true,
        timestamps: true,
        upsert: false
    }
    const ud = await UserModal.findOneAndUpdate(filter, update, options);

    //check user found or not 
    // then send response accordingly
    if(ud == null || ud == "") {
        return res.status(200).json({
            status: 'fail',
            message: "Account not found, please try again.",
            data: {}
        });
    }

    return res.status(200).json({
        status: 'success',
        message: "successfully updated",
        data: {
            _id: ud._id,
            first_name: ud.first_name, 
            last_name: ud.last_name,
            email: ud.email
        }
    });

    
}

getUserById = async (req, res) => {
    const id = req.params.id.trim();
    if(id == "") {
        res.status(200).json({status: 'fail', message: 'Please provide user id.', data: {}});
    }

    let userDetails = await UserModal.findOne({ _id: id }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.status(200).json({status: 'fail', message: 'User not found', data: {}});
    }
    let userData = {
        _id: userDetails._id,
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: userDetails.email
    };
    res.status(200).json({ 
        status: 'success', 
        message: "User found", 
        data: userData
    });
};

getUserByEmail = async (req, res) => {
    const email = req.params.email.trim();
    if (email == "") {
        res.status(200).json({status: 'fail', message: 'Email address required', data: {}});
    }

    let userDetails = await UserModal.findOne({ email: email }).exec();
    if ( userDetails == null || userDetails == "" ) {
        res.status(200).json({status: 'fail', message: 'User not found', data: {}});
    }
    let userData = {
        _id: userDetails._id,
        first_name: userDetails.first_name, 
        last_name: userDetails.last_name,
        email: userDetails.email,
        password: userDetails.password
    };
    res.status(200).json({ status: 'success', message: "User found", data: userData});   
};

/** Method: post
 */
updatePassword = async (req, res) => {
    const reqBody = req.body;

    // .email.trim();
    // const userPassword = req.body.password.trim();

    if (!reqBody.email) {
        return res.status(200).send({
            status: 'fail',
            message: 'Email address is required.',
            data: {}
        });
    }

    if(!reqBody.password) {
        return res.status(200).send({
            status: 'fail',
            message: 'Password cannot be empty.',
            data: {}
        });
    }

    const pw = getHash(reqBody.password.trim());

    let query = {
        email: reqBody.email.trim() 
    }

    let update = {
        password: pw
    }

    let options = {
        new: true,
        timestamps: true,
        upsert: false
    }

    const ud = await UserModal.findOneAndUpdate(query, update, options);
    
    // console.log(ud);
    if(ud == null || ud == "") {
        return res.status(200).json({
            status: 'fail',
            message: "Account not found, please try again.",
            data: {}
        });
    }

    return res.status(200).json({
        status: 'success',
        message: "Successfully password updated.",
        data: {
            _id: ud._id,
            // email: ud.email,
        }
    });
};

function getHash(password) {
    const secret = process.env.SECRET;
    // let hashPromise = new Promise( (resolve, reject) => {
    //     crypto.createHmac('sha1', secret)
    //         .update(req.body.password)
    //         .digest('hex');
    // });
    return crypto.createHmac('sha1', secret)
                   .update(password)
                   .digest('hex');
}

getAllUsers = async (req, res) => {
    
    let users = await UserModal.find({});

    console.log(users);
    return res.status(200).json({
        status: 'success',
        message: "",
        data1: users
    });
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    updatePassword,
    getUserById,
    getUserByEmail,
    getAllUsers
};
