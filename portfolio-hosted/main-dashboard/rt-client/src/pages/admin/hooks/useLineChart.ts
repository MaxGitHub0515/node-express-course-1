


import {
  LineChart, Line,
  // BarChart, Bar,
  // PieChart, Pie, Cell,
  // AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';


{/* Urgent charts for Admin Page - Area chart Bar chart  Line Chart */}

interface VisitData {
  month: string;
  visits: number;
}

export default function useLineChart() {
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
    return ()
}
