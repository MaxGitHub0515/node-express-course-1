
import { useState } from 'react';
import type { FC } from 'react';

const MaintenanceToggle: FC = () => {
  const [isMaintenanceOn, setIsMaintenanceOn] = useState<boolean>(false);

  const toggleMaintenance = (): void => {
    setIsMaintenanceOn(prev => !prev);
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-100 rounded shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Maintenance Mode</h2>
      <p className="mb-4">
        Status:{" "}
        <span className={isMaintenanceOn ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
          {isMaintenanceOn ? "ON" : "OFF"}
        </span>
      </p>
      <button
        onClick={toggleMaintenance}
        className={`px-4 py-2 rounded text-white ${
          isMaintenanceOn ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isMaintenanceOn ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
};

export default MaintenanceToggle;
