// import SideBar from "./components/SibeBar";
import MaintenanceToggle from "./components/MaintenanceToggle";
export default function MaintenancePage() {
    return (
        <>
        <div className="w-screen h-screen flex flex-col gap-y-8 items-center justify-center">
            <h1 className="text-2xl text-blue-600 underline">Maintenance Page</h1>
            <MaintenanceToggle />
            <div>
                 <a href="/cpanel" className="text-2xl text-blue">
                 <span className="text-blue-600 underline">Go back to Admin Dashboard</span>
                 </a>
            </div>
           
        </div>
        </>
    );
}