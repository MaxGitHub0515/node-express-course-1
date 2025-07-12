import Visitor from "../models/visitor.model.js"

// middleware like
const createVisitor = async(req, res, next) => {
    try {
    const visitor = await Visitor.create({
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl
    });
      console.log('Visitor saved:', visitor);
    next();
} catch (error) {
    next(error)
}
}

const aggregateUser = async(req, res) => {
    try{
    const result = await Visitor.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        visits: { $sum: 1 },
      },
    },
    {
      $project: {
        month: '$_id',
        visits: 1,
        _id: 0,
      },
    },
    { $sort: { month: 1 } }
    ]);

    res.json(result)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Failed to aggregate visits" });
     

    }
}

export {
    createVisitor,
    aggregateUser
}


