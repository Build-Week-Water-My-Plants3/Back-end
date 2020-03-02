const users = require("../../routers/user/userModel");
const { dataUri } = require("../middleware/images");
const { uploader } = require("../config/cloudConfig");

// MIDDLEWARE FOR IMAGE UPLOADING

const vSpecies = async (req, res, next) => {
  const plantData = req.body;

  if (plantData.species_name) {
    let species = plantData.species_name.toLowerCase();

    try {
      const exist = await users.getSpecies({ name: species });
      if (exist) {
        plantData.species_name = exist.name;
        next();
      } else {
        try {
          const speciesAdded = await users.addSpecies(exist);
          plantData.species_name = speciesAdded.name;
          next();
        } catch (error) {
          res.status(500).json({ error: "issue" });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "no species" });
    }
  } else {
    plantData.species_name = "default";
    next();
  }
};

const imageValidation = async (req, res, next) => {
  const plantData = req.body;

  if (req.file) {
    const files = dataUri(req).content;

    return uploader
      .upload(files)
      .then(result => {
        plantData.photo = result.url;
        next();
      })
      .catch(error => {
        plantData.photo = null;
        next();
      });
  } else {
    plantData.photo = null;
    next();
  }
};

module.exports = {
  imageValidation,
  vSpecies
};
