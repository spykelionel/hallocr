const Room = require("../models/Room");
const Hostel = require("../models/Hostel");

module.exports = {
  create: async (req, res, next) => {
    Room?.exists({ number: req.body.number })
      .then(async (result) => {
        if (!result) {
          try {
            Hostel?.exists(
              { _id: req.body.hostelId } || {
                hostelNumber: req.body.hostelNumber,
              }
            )
              .then(async (result) => {
                if (result) {
                  const room = new Room({ ...req.body });
                  await room
                    .save()
                    .then((result) => res.status(201).send(result))
                    .catch((err) => res.status(409).send(err));
                  console.log(req.body);
                } else {
                  res.status(404).json({
                    info: "requested hostel not found",
                    statusCode: 404,
                  });
                }
              })
              .catch((err) =>
                res
                  .status(501)
                  .send({ ...err, info: "requested hostel not found" })
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
    await Room.find({})
      .lean()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(503).send(err));
  },

  getOne: async (req, res) => {
    await Room.findOne({ _id: req.params.id })
      .lean()
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        }
        res.status(404).json({
          message: "Room Not found",
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
    await Room.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        }
        res.status(404).json({
          message: "Room Not found",
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
    await Room.deleteMany({})
      .then((result) =>
        res.status(200).send({ ...result, info: "deleted all rooms" })
      )
      .catch((err) =>
        res.status(404).json({
          ...err,
          message: "Not found",
        })
      );
  },

  update: async (req, res) => {
    Room?.exists({ _id: req.params.id })
      .then(async (result) => {
        if (result) {
          try {
            await Room.updateOne(
              { _id: req.params.id },
              {
                $set: req.body,
              }
            )
              .then((result) =>
                res.status(201).send({
                  ...result,
                  info: "successfully updated room",
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
