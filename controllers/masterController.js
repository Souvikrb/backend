const Country = require("../models/country");
const City = require("../models/city");
const Master = require("../models/master");

// Get list of all countries
exports.countryList = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.status(200).json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Add a new country
exports.countryAdd = async (req, res) => {
  try {
    
    const { country,M_CODE } = req.body;
    // Validation
    if (!country) {
      return res.status(400).json({ message: "Country is required" });
    }

    // Check if country already exists
    const existingCountry = await Master.findOne({ master_code:M_CODE,DESC1:country });
    if (existingCountry) {
      return res.status(500).json({ message: "Country already exists"});
    }

    // Create and save the new country
    const newCountry = new Master({ master_code:M_CODE,DESC1:country });
    await newCountry.save();

    res.status(201).json({ message: "Country Created Successfully" });
  } catch (error) {
    console.error("Error adding country:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Get list of all cities
// exports.cityList = async (req, res) => {
//   try {
//     const cities = await City.find({});
//     res.status(200).json(cities);
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// };

// Add a new city
exports.cityAdd = async (req, res) => {
  try {
    const { city, country_id } = req.body;
    // Validation
    if (!city || !country_id) {
      return res.status(400).json({ message: "Both city and country are required" });
    }

    // Check if city already exists for the country
    const existingCity = await City.findOne({ city, country:country_id });
    if (existingCity) {
      return res.status(400).json({ message: "City already exists in this country" });
    }

    // Create and save the new city
    const newCity = new City({ city, country:country_id });
    await newCity.save();

    res.status(201).json({ message: "City Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Get list of cities by country
exports.cityList = async (req, res) => {
  try {
    const countryId = req.params.id;

    if (countryId) {
      var cities = await City.find({ country: countryId });
    }else{
      var cities = await City.find({});
    }
    
    return res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Add list of master  data by master code
exports.masterAdd = async (req, res) => {
  try {
    const { parent_id = null, M_CODE, DESC1, DESC2 } = req.body;
    const { id = null } = req.params; 
    // Validation
    if (!DESC1) {
      return res.status(400).json({ message: "Please enter fields value." });
    }
    // If ID is provided, perform an update, otherwise create a new record
    if (id !== null) {
      //Edit functionality - Find the record by ID and update it
      const existingValue = await Master.findById(id);
      if (!existingValue) {
        return res.status(404).json({ message: "Data not found for editing" });
      }

      //Check if value already exists (same DESC1 and master_code for edit)
      const duplicateValue = await Master.findOne({ master_code: M_CODE, DESC1, _id: { $ne: id } });
      if (duplicateValue) {
        return res.status(500).json({ message: "Value already exists" });
      }

      //Update the record
      existingValue.parent_id = parent_id;
      existingValue.master_code = M_CODE;
      existingValue.DESC1 = DESC1;
      existingValue.DESC2 = DESC2;

      await existingValue.save();

       return res.status(200).json({ message: "Data Updated Successfully" });
    } else {
      // Create functionality - Check if value already exists for new record
      const existingValue = await Master.findOne({ master_code: M_CODE, DESC1 });
      if (existingValue) {
        return res.status(500).json({ message: "Value already exists" });
      }

      // Create and save the new master value
      const newValue = new Master({ parent_id, master_code: M_CODE, DESC1, DESC2 });
      await newValue.save();

      return res.status(201).json({ message: "Data Created Successfully" });
    }
  } catch (error) {
    console.error("Error processing master data:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


// Get list of master  data by master code
exports.masterList = async (req, res) => {
  try {
    const {mid,id} = req.params;
    if (mid) {
      var datalist = await Master.find({ master_code: mid,status:1 });
      var datalist = await Master.aggregate([
        {
            $match: {
                master_code: mid, 
            },
        },
        {
            $lookup: {
                from: "masters", 
                localField: "parent_id", 
                foreignField: "_id", 
                as: "parentCategory", 
            },
        },
        {
          $addFields: {
              parentName: {
                  $ifNull: [
                      { $arrayElemAt: ["$parentCategory.DESC1", 0] }, // Extract parent DESC1
                      null, // Default to null if no parent
                  ],
              },
          },
      },
        {
            $project: {
                parentCategory: 0, // Exclude the full parentCategory array
            },
        },
    ]);

    }else{
      var datalist = await Master.find({});
    }
    
    return res.status(200).json({message:datalist});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Delete Master data
exports.masterDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMaster = await Master.findByIdAndDelete(id);

    if (!deletedMaster) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Also delete any data associated with this menu
    await Master.deleteMany({ parent_id: id });

    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};

exports.masterSingledata = async ( req, res ) => {
  try{
    const { id } = req.params;
    if(!id)
      return res.status(400).json({'message':'Edit id is missing'});

    const updateData = await Master.findOne({_id:id});

    return res.status(200).json({message:updateData});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

exports.masterUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, url, parent, order } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: 'Menu name and URL are required' });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { name, url, parent, order },
      { new: true } // Return the updated document
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.status(200).json({ message: 'Menu updated successfully', data: updatedMenu });
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ message: 'Error updating menu', error: error.message });
  }
};

