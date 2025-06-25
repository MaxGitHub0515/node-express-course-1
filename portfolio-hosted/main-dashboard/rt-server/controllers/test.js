
const testController = async (req, res) => {
    try {
  
        const result = { message: "Test successful" };
        return res.status(200).json(result);
       
    } catch (error) {
        // Handle any errors that occur during the test operation
        console.error("Error in testController:", error);
        res.status(500).json({ error: "An error occurred during the test operation" });
    }
    }

export { testController };