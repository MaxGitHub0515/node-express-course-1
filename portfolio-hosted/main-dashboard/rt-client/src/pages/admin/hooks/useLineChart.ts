
import { useEffect, useState } from 'react';
import type { VisitData } from '../../../types';

{/* Urgent charts for Admin Page - Area chart Bar chart  Line Chart */}

export function useLineChart() {
     const [data, setData] = useState<VisitData[]>([]);

      useEffect(() => {
        const getVisitors = async () => {
          try {
          const res = await fetch('/api/v1/visitors/monthly');
          const raw: { month: number; visits: number }[] = await res.json();
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
          } catch (error) {
            console.log("Failed to fetch chart data:", error)
          }
      };
      getVisitors();
    }, []);
    return data;
}
