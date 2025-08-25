// Controller to return help details
const helpDetails = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Successfully hitting the Help API",
      data: {
        contact: "+91XXXXXXXX", // Contact info
      },
    });
  } catch (error) {
    console.error("Error in Help API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { helpDetails };
