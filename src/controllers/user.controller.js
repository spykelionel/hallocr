const User = require("../models/User");
const Role = require("../models/Role");

module.exports = {
  create: async (req, res, next) => {
    User?.exists({ number: req.body.number })
      .then(async (result) => {
        if (!result) {
          try {
            Role?.exists(
              { _id: req.body.RoleId } || {
                name: req.body.name,
              }
            )
              .then(async (result) => {
                if (result) {
                  const user = new User({ ...req.body });
                  await user
                    .save()
                    .then((result) => res.status(201).send(result))
                    .catch((err) => res.status(409).send(err));
                  console.log(req.body);
                } else {
                  res.status(404).json({
                    info: "requested Role not found",
                    statusCode: 404,
                  });
                }
              })
              .catch((err) =>
                res
                  .status(501)
                  .send({ ...err, info: "requested Role not found" })
              );
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(409).json({
            message: "Resource Exist",
          });
        }
      })
      .catch((err) => console.error(err));
  },

  getAll: async (req, res, next) => {
    await User.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  },

  getOne: async (req, res) => {
    await User.findOne({ _id: req.params.id })
      .lean()
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        }
        res.status(404).json({
          message: "User Not found",
        });
      })
      .catch((err) =>
        res.status(501).json({
          ...err,
          info: "Server Error",
        })
      );
  },

  deleteOne: async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        }
        res.status(404).json({
          message: "User Not found",
        });
      })
      .catch((err) =>
        res.status(501).json({
          ...err,
          message: "Not found",
        })
      );
  },

  deleteAll: async (req, res) => {
    await User.deleteMany({})
      .then((result) =>
        res.status(200).send({ ...result, info: "deleted all Users" })
      )
      .catch((err) =>
        res.status(404).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    User?.exists({ _id: req.params.id })
      .then(async (result) => {
        if (result) {
          try {
            await User.updateOne(
              { _id: req.params.id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(201).send({
                  ...result,
                  info: "successfully updated User",
                })
              )
              .catch((err) => res.status(409).send(err));
          } catch (error) {
            console.log(error);
          }
        } else {
          res.status(404).json({
            info: { message: "Resource Doesn't Exist", valid: false },
          });
        }
      })
      .catch((err) => console.error(err));
  },
};
