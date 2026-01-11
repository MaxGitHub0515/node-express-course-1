
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getAnalyticsData = async () => {
        const totalUser = await User.countDocuments();
        const totalProdiucts = await Product.countDocuments();

        const salesData = await Order.aggregate([
            {
                // to group based on common values
                $group: {
                    _id: null, // group all documents together under the same group
                    totalSales: { $sum: 1 }, // 1 = true for each document
                    totalRevenue: { $sum: "$totalAmount" }
                },
                

            }
        ]);
        const {totalSales, totalRevenue} = salesData[0] || {totalSales: 0, totalRevenue: 0};
        return {
            users: totalUser,
            products: totalProdiucts,
            totalSales,
            totalRevenue
        }
    
}

export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: { // find docs where ... - get orders within that period of time
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                    }
                },
            {   // smallest to largest (A to Z, 1 to 100, Oldest to Newest).
                $sort: { _id: 1 } // sort by date ascending
            }
            ]);
            const dateArr = getDatesInRange(startDate, endDate); // from last week till today
            return dateArr.map(date => {
                const findDate = dailySalesData.find(item => item._id === date);
                return {
                    date,
                    sales: findDate?.sales || 0,
                    revenue: findDate?.revenue || 0
                }
            });


    } catch (error) {
        console.log("Error in getDailySalesData:", error.message);
        throw new Error("Failed to get daily sales data");
    }
}

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

// output :
// [
//     //
//     { date: "2023-10-01", sales: 5, revenue: 500 },
//     { date: "2023-10-02", sales: 3, revenue: 300 },
//     ...
// ]