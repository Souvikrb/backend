const Menu = require('../models/menu');

// Add a new menu or submenu
exports.addMenu = async (req, res) => {
  try {
    const { name, url, parent, order, icon } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: 'Menu name and URL are required' });
    }

    const newMenu = new Menu({
      name,
      url,
      parent: parent || null, // If no parent is provided, it's a top-level menu
      order: order || 0,
      icon: icon||null
    });

    await newMenu.save();
    res.status(201).json({ message: 'Menu added successfully', data: newMenu });
  } catch (error) {
    console.error('Error adding menu:', error);
    res.status(500).json({ message: 'Error adding menu', error: error.message });
  }
};

// Get all menus (including submenus)
exports.getMenus = async (req, res) => {
    try {
      //const userRole = req.user.role; // Assuming `req.user` contains the authenticated user's info
      const userRole = 'user';
      const menus = await Menu.find({ parent: null }).sort({ order: 1 }); // Top-level menus only
  
      const populateSubmenus = async (menus) => {
        for (let menu of menus) {
          const submenus = await Menu.find({ parent: menu._id }).sort({ order: 1 });
  
          // Filter submenus based on user's role
          menu.submenus = submenus.filter(submenu => submenu.roles.includes(userRole));
        }
  
        // Filter menus based on user's role
        return menus.filter(menu => menu.roles.includes(userRole));
      };
  
      const accessibleMenus = await populateSubmenus(menus);
  
      res.status(200).json({ message: 'Menus fetched successfully', data: accessibleMenus });
    } catch (error) {
      console.error('Error fetching menus:', error);
      res.status(500).json({ message: 'Error fetching menus', error: error.message });
    }
  };

// Update a menu (or submenu)
exports.updateMenu = async (req, res) => {
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

// Delete a menu (or submenu)
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Also delete any submenus associated with this menu
    await Menu.deleteMany({ parent: id });

    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    res.status(500).json({ message: 'Error deleting menu', error: error.message });
  }
};
