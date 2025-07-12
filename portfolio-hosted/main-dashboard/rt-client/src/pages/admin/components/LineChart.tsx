
import {
  LineChart, Line,
  // BarChart, Bar,
  // PieChart, Pie, Cell,
  // AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

  {/* Urgent charts for Admin Page
  Area chart Bar chart  Line Chart */}
interface VisitData {
  month: string;
  visits: number;
}

export default function LineChartComponent() {
  const [data, setData] = useState<VisitData[]>([]);

  useEffect(() => {
      fetch('/api/v1/visitors/monthly') 
      .then(res => res.json())
      .then((raw: { month: number; visits: number }[]) => {
        const months = [
          "Jan", "Feb", "Mar", "Apr",
          "May", "Jun", "Jul", "Aug",
          "Sep", "Oct", "Nov", "Dec"
        ];

        const filled: VisitData[] = Array.from({ length: 12 }, (_, i) => ({
          month: months[i],
          visits: 0
        }));

        raw.forEach(({ month, visits }) => {
          if (month >= 1 && month <= 12) {
            filled[month - 1].visits = visits;
          }
        });

        setData(filled);
      });
  }, []);


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