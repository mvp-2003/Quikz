// Dummy dta i assume here
let categories = [
    { id: '1', name: 'Science' },
    { id: '2', name: 'Mathematics' },
    { id: '3', name: 'History' },
];

// Function to get all quiz categories
const getCategories = async (req, res) => {
    try {
        if (categories.length === 0) {
            return res.status(404).json({
                message: 'No categories found',
                data: null,
                success: false,
            });
        }

        res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching categories',
            error: error.message,
            success: false,
        });
    }
};

// Function to add a new category
const addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(400).json({
                message: 'Category name is required',
                data: null,
                success: false,
            });
        }

        const newCategory = {
            id: (categories.length + 1).toString(),
            name,
        };
        categories.push(newCategory);
        
        res.status(201).json({
            message: 'Category added successfully',
            data: newCategory,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding category',
            error: error.message,
            success: false,
        });
    }
};

// Function to delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const categoryIndex = categories.findIndex(category => category.id === id);
        
        if (categoryIndex === -1) {
            return res.status(404).json({
                message: 'Category not found',
                data: null,
                success: false,
            });
        }

        categories.splice(categoryIndex, 1); // Remove the category from the array
        
        res.status(200).json({
            message: 'Category deleted successfully',
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting category',
            error: error.message,
            success: false,
        });
    }
};

module.exports = { getCategories, addCategory, deleteCategory };
