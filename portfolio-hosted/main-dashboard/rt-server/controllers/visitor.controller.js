import Visitor from "../models/visitor.model.js"

// middleware like
const createVisitor = async(req, res, next) => {
    try {
    const {url} = req.body;
    const visitor = await Visitor.create({
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url
    });
      console.log('Visitor was saved successfully:', visitor);
      res.status(201).json(visitor)
} catch (error) {
    next(error)
} 
}

const aggregateUser = async(req, res) => {
    try{
    const result = await Visitor.aggregate([
    {
      $group: {
        _id: {
          year: {$year: "$createdAt"}, 
          month: {$month: "$createdAt"}
          },
        visits: { $sum: 1 },
      },
    },
    {
      $project: {
        year: '$_id.year',
        month: '$_id.month',
        visits: 1,
        _id: 0,
      },
    },
    { $sort: { year:1, month: 1 } }
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


