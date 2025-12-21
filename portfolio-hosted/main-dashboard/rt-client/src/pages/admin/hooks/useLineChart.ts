
import { useEffect, useState } from 'react';
import type { VisitData } from '../../../types';

{/* Urgent charts for Admin Page - Area chart Bar chart  Line Chart */}

export function useLineChart() {
     const [data, setData] = useState<VisitData[]>([]);
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";
      useEffect(() => {
        const getVisitors = async () => {
          try {
          const res = await fetch(`${API_BASE_URL}/api/v1/visitors/monthly`);
          const raw: { month: number; visits: number, year:number }[] = await res.json();
          const months = [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"
          ];
    
          const filled: VisitData[] = Array.from({ length: 12 }, (_, i) => ({
            month: months[i],
            visits: 0,
            year: raw[0]?.year ?? new Date().getFullYear(),
            }));
            // TODO:be able to retrive previous years for later analytics 
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
    }, [API_BASE_URL]);
    return data;
}
