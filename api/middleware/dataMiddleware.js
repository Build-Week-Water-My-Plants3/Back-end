const users = require("../../routers/user/userModel");
const { dataUri } = require("../middleware/images");
const { uploader } = require("../config/cloudConfig");

// MIDDLEWARE FOR IMAGE UPLOADING

const vSpecies = async (req, res, next) => {
  const plantData = req.body;

  if (plantData.species_name) {
    let species = plantData.species_name.toLowerCase();

    try {
      const exist = await users.getSpecies({ species_name: species });
      if (exist) {
        // req.plant.species_id = exist.id;
        req.plant = {
          nickname: plantData.nickname,
          species_id: exist.id,
          frequency: plantData.frequency,
          photo: plantData.photo
        };
        next();
      } else {
        try {
          const speciesAdded = await users.addSpecies({
            species_name: plantData.species_name
          });
          req.plant.species_id = speciesAdded.id;
          req.plant = {
            nickname: plantData.nickname,
            species_id: speciesAdded.id,
            frequency: plantData.frequency,
            photo: plantData.photo
          };
          next();
        } catch ({ error, name, message }) {
          res.status(500).json({ error, name, message });
        }
      }
    } catch (error) {
      res.status(500).json({ error: "no species" });
    }
  } else {
    // plantData.species_id = 1;
    req.plant = {
      nickname: plantData.nickname,
      species_id: 1,
      frequency: plantData.frequency,
      photo: plantData.photo
    };
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
