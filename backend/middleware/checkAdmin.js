const Admin = require("../schemas/adminSchema");

exports.checkAdmin = async (req, res, next) => {
  const admin = await Admin.findOne({ adminId: req.userData._id });

  if (!admin) {
    return res.status(401).json({
      message: "You need to be an admin to do this",
    });
  }

  next();
};
