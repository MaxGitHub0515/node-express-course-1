
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

  {/* Urgent charts for Admin Page
  Area chart Bar chart  Line Chart */}
export default function LineChartComponent() {
     //dummy data for charts
    const data = [
  { month: 'Jan', users: 400, sales: 2400 },
  { month: 'Feb', users: 600, sales: 3200 },
  { month: 'Mar', users: 800, sales: 2900 },
  { month: 'Apr', users: 700, sales: 3600 },
  { month: 'May', users: 900, sales: 4100 },
];

    return (
            
    <div className='flex gap-x-4 mt-1.5'>
    {/* Line Charts */}
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col justify-center items-center max-h-64">
    <div className="text-lg font-medium uppercase mb-2 text-center">User Growth</div> 
    <ResponsiveContainer width={500} height={250}>
    <LineChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <CartesianGrid strokeDasharray="3 3" />
    <Line type="monotone" dataKey="users" stroke="#16a34a" strokeWidth={2} />
    </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
    )
    

}