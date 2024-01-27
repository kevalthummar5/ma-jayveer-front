import { Outlet } from "react-router-dom"
function RootLayout() {
   return (
      <div className="RootLayout">
         <Outlet />
      </div>
   )
}

export default RootLayout
