const router = require("express").Router();
const users = require("./userModel");
const crypt = require("bcryptjs");
// for user: return shape of data during login
const { imageUpload } = require("../../api/middleware/images");
const {
  vSpecies,
  imageValidation
} = require("../../api/middleware/dataMiddleware");

// GET USER
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await users.getUserId(id);
    const plants = await users.getPlants(id);
    res.status(200).json({
      user: {
        ...user,
        plants
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// EDIT USER
router.put("/:id", (req, res) => {
  const { id } = req.params;
  let data = req.plant;

  users.getUserId(id).then(user => {
    if (user) {
      if (data.phonenumber && data.password) {
        const hash = crypt.hashSync(data.password, 8);
        data.password = hash;
        users
          .updateUser(id, data)
          .then(use => {
            res.status(200).json(use);
          })
          .catch(error => {
            res.status(400).json({ error: "cant find info" });
          });
      }
    }
  });
});

// GET PLANTS
router.get("/:id/plants", (req, res) => {
  const { id } = req.params;
  users
    .getUserId(id)
    .then(user => {
      if (user) {
        users
          .getPlants(id)
          .then(plants => {
            res.status(200).json(plants);
          })
          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      } else {
        res.status(400).json({ error: "Invalid User ID" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "User not found!" });
    });
});

// ADD PLANTS
router.post(
  "/:id/plants",
  imageUpload,
  imageValidation,
  vSpecies,
  (req, res) => {
    const { id } = req.params;
    const data = req.plant;
    // console.log(id);
    console.log(data);
    users
      .getUserId(id)

      .then(user => {
        if (user) {
          if (data.nickname && data.frequency) {
            users
              .addPlant(data)
              .then(plant => {
                users
                  .addToUser(plant.id, id)
                  .then(userP => {
                    res.status(200).json(plant);
                  })
                  .catch(error => {
                    res.status(500).json({ error: "nada" });
                  });
              })
              .catch(({ name, message, error }) => {
                res.status(500).json({ name, message, error });
              });
          } else {
            res.status(400).json({ error: "might need a fix" });
          }
        } else {
          res.status(500).json({ error: "user not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "no good" });
      });
  }
);

// EDIT PLANTS
router.put(
  "/:id/plants/:plantid",
  imageUpload,
  imageValidation,
  vSpecies,
  (req, res) => {
    const { id, plantid } = req.params;
    const plantData = req.plant;

    users
      .getUserId(id)
      .then(user => {
        users
          .getPlant(plantid)
          .then(plant => {
            users
              .updatePlant(plantid, plantData)
              .then(update => {
                res.status(200).json(update);
              })
              .catch(error => {
                res.status(400).json({ error: "noooooo" });
              });
          })
          .catch(error => {
            res.status(500).json({ error: "plant not found" });
          });
      })
      .catch(error => res.status(500).json({ error: "user not found" }));
  }
);
// DELETE PLANTS
router.delete("/:id/plants/:plantid", (req, res) => {
  const { id, plantid } = req.params;
  users
    .getUserId(id)
    .then(user => {
      if (user) {
        users
          .getPlantId(plantid)
          .then(plant => {
            if (plant) {
              users
                .removePlant(plantid)
                .then(log => res.status(200).json(plant))
                .catch(err =>
                  res.status(500).json({ error: "Try again later" })
                );
            } else {
              res.status(500).json({ error: "Invalid Plant ID" });
            }
          })
          .catch(err => {
            res.status(404).json({ error: "Plant not found!" });
          });
      } else {
        res.status(400).json({ error: "Invalid User ID" });
      }
    })
    .catch(err => {
      res.status(404).json({ error: "User not found!" });
    });
});
module.exports = router;
