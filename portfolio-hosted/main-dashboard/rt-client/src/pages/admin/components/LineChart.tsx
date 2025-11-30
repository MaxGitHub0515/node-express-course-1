
import {
  LineChart, Line,
  // BarChart, Bar,
  // PieChart, Pie, Cell,
  // AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useLineChart } from '../hooks/useLineChart';
import type { VisitData } from '../../../types';

{/* Urgent charts for Admin Page
Area chart Bar chart  Line Chart */}

export default function LineChartComponent() {
    const data: VisitData[] = useLineChart();
    return (       
    <div className='flex flex-wrap gap-4 mt-1.5  '>
    {/* Line Charts */}
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col justify-center flex-grow min-w-[860px]  ">
    <div className="text-lg font-medium uppercase mb-4 text-center">Monthly Visits</div> 
    <ResponsiveContainer width="100%" height={400}>
    <LineChart data={data}>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <CartesianGrid strokeDasharray="3 3" />
    <Line type="monotone" dataKey="visits" stroke="#16a34a" strokeWidth={2} />
    </LineChart>
    </ResponsiveContainer>
    </div>  
    </div>
    )
}