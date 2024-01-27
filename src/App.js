import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "flatpickr/dist/flatpickr.min.css"

import RootLayout from "./RootLayout"
import { RouterProvider } from "react-router"
import Home from "./views/Home/Home"
import SignUp from "./views/Auth/SignUp"
import Login from "./views/Auth/Login"
import Dashboard from "./views/Dashboard/Dashboard"
import { createBrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import AuthProvider from "./context/AuthProvider"
import UserList from "./views/UserList/UserList"
import AddUser from "./views/UserList/AddUser"
import StockList from "./views/StockList/StockList"
import AddStock from "./views/StockList/AddStock"
import ContactUs from "./views/Other/ContactUs"
import About from "./views/Other/About"
import { managerAccessloader, userAccessloader, userloader } from "./utils"
import Error from "./views/Error/Error"
import ViewUser from "./views/UserList/ViewUser/ViewUser"
import MobileUsersProvider from "./context/MobileUsersProvider"
import UnloggedUserList from "./views/UserList/UnloggedUserList"
function App() {
   const router = createBrowserRouter([
      {
         path: "/",
         element: <RootLayout />,
         children: [
            { path: "/", element: <Home /> },
            { path: "/home", element: <Home /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/login", element: <Login /> },
            { path: "/contact", element: <ContactUs /> },
            { path: "/about", element: <About /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/users", element: <UserList />, loader: userloader },
            { path: "/unlogged-user", element: <UnloggedUserList />, loader: managerAccessloader },
            { path: "/users/add", element: <AddUser />, loader: userloader },
            { path: "/users/edit/:id", element: <AddUser />, loader: userAccessloader },
            { path: "/users/view/:id", element: <ViewUser />, loader: userAccessloader },
            { path: "/stocks", element: <StockList />, loader: userloader },
            { path: "/stocks/add", element: <AddStock />, loader: userloader },
            { path: "/stocks/edit/:id", element: <AddStock />, loader: userloader },
            { path: "/*", element: <Error /> }
         ]
      }
   ])
   useEffect(() => {
      // localStorage.clear()
      // return () => {}
   }, [])
   return (
      <div className="App">
         <AuthProvider>
            <MobileUsersProvider>
               <RouterProvider router={router}></RouterProvider>
               <Toaster />
            </MobileUsersProvider>
         </AuthProvider>

         {/* <RootLayout></RootLayout> */}
      </div>
   )
}

export default App
