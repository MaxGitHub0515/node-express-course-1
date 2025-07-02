

export default function MainDashboard() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">Main Dashboard</h1>
            <p className="mt-4 text-xl text-gray-600">Welcome to the Main Dashboard</p>
            <a href="/main-dashboard" className="mt-6 text-blue-500 hover:underline">
                Go to Main Dashboard
            </a>
        </div>
    );
}