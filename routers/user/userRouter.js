const router = require("express").Router();
const Users = require("./userModel");
// for user: return shape of data during login
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.getUserId(id);
    const plants = await Users.getPlants(id);
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
router.get("/:id/plants", (req, res) => {
  const { id } = req.params;
  Users.getUserId(id)
    .then(user => {
      if (user) {
        Users.getPlants(id)
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
router.post("/:id/plants", (req, res) => {});
router.put("/:id/plants/:plantid", (req, res) => {});
router.delete("/:id/plants/:plantid", (req, res) => {
  const { id, plantid } = req.params;
  Users.getUserId(id)
    .then(user => {
      if (user) {
        Users.getPlantId(plantid)
          .then(plant => {
            if (plant) {
              Users.removePlant(plantid)
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
