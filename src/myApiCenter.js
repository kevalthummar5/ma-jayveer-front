// import { instance, instance2 } from "./utils"
import { toast } from "react-hot-toast"
import axios from "axios"
/*********************** ** */
export function getCookieByName(cookiename) {
   // Get name followed by anything except a semicolon
   const cookiestring = RegExp(`${cookiename}=[^;]+`).exec(document.cookie)
   // Return everything after the equal sign, or an empty string if the cookie name not found
   return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "")
}
export const deleteCookie = (name) => {
   document.cookie = name + "="
}

// To delete a specific cookie by name, call the function with the cookie name

export const instance = () => {
   return axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: { Authorization: `Bearer ${getCookieByName("token1")}` },
      mode: "no cors"
   })
}

export const instance3 = () => {
   return axios.create({
      baseURL: `http://localhost:8080`,
      //   headers: { Authorization: `Bearer ${getCookieByName("token")}` }
      headers: { Authorization: `Bearer ` }
   })
}

export const postRequestToken = async (data) => {
   const newInstance = instance3()
   try {
      const j = await newInstance.post("/token", data)
      // console.log(j)
      toast.success(j.data?.status)
      // console.log(j)
      return j
   } catch (error) {
      toast.error(error.response?.data?.status)
      console.log(error)
      //   handleApiError(error)
   }
}

export const instance2 = axios.create({
   baseURL: "http://localhost:3100", // Set your API base URL
   timeout: 5000 // Set a timeout for requests (adjust as needed)
})

export const postLogin = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post("auth/login", data)
      // toast.success("color added successfully")
      // console.log(j.data)
      if (j) {
         return j.data
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error.response?.data?.message}`)
   }
}
export const postSignUp = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post("users/sign-up", data)
      toast.success(j.data.message)
      if (j) {
         return j.data
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error.response?.data?.message}`)
   }
}
/*********************** ** */

/*********************** ** */

export const postAddStock = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post("/stocks", data)
      toast.success(j.data.message)
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const putStock = async (id, data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.patch(`/stocks/${id}`, data)
      toast.success("stock updated successfully")
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const getStocktById = async (id) => {
   const newInstance = instance()
   try {
      const j = await newInstance.get(`/stocks/${id}`)
      // toast.success("type added successfully")
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const getAllStock = async () => {
   const newInstance = instance()
   try {
      const j = await newInstance.get(`/stocks`)
      // toast.success("type added successfully")
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}
export const getStockAsOption = async () => {
   const newInstance = instance()
   try {
      const j = await newInstance.get("/stocks")
      // console.log(j)s
      return j.data.stock?.map((e) => {
         return { value: e._id, label: e.name }
      })
   } catch (error) {
      console.log(error)
   }
}
/*********************** ** */

/*********************** ** */

export const postAddUser = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post("/admin/add-user", data)
      toast.success(j.data.message)
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const putUser = async (id, data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.patch(`admin/edit-user/${id}`, data)
      toast.success("user updated successfully")
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const getUserById = async (id) => {
   const newInstance = instance()
   try {
      const j = await newInstance.get(`/admin/get-user/${id}`)
      // toast.success("type added successfully")
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const getAllUser = async () => {
   const newInstance = instance()
   try {
      const j = await newInstance.get(`/admin/get-all-users`)
      // toast.success("type added successfully")
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const getUnloggedUser = async () => {
   const newInstance = instance()
   try {
      const j = await newInstance.get(`/admin/is-all-set`)
      // toast.success("type added successfully")
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const getErrorUser = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post(`/orders/give-quantity-difference`, data)
      // toast.success("type added successfully")
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}

export const resetPasswordForUser = async (id, data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.patch(`admin/reset-password/${id}`, data)
      toast.success(j.data)
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error.response.data.message}`)
   }
}
/*********************** ** */
/*********************** ** */

/*********************** ** */
export const postSendRequestToken = async (data) => {
   const newInstance = instance()
   try {
      toast.loading("saving")
      const j = await newInstance.post(`/users/gen-session`, data)
      toast.dismiss()
      toast.success(j?.data?.message)
      // console.log(j)
      return j
   } catch (error) {
      toast.dismiss()
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */

/*********************** ** */
export const postOrderForUser = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post(`/orders/place-order`, data)
      // toast.success(j?.data?.message)
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data || "something went wrong"}`)
   }
}
/*********************** ** */
/*********************** ** */
export const putOrderForUser = async (data) => {
   const newInstance = instance()
   try {
      const j = await newInstance.post(`/orders/place-order`, data)
      // toast.success(j?.data?.message)
      // console.log(j)
      return j
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data || "something went wrong"}`)
   }
}
/*********************** ** */

/*********************** ** */
export const getPositionOfUsers = async (id) => {
   const newInstance = instance()
   try {
      toast.loading("fetching....")
      const j = await newInstance.get(`orders/get-positions/${id}`)
      toast.dismiss()
      // toast.success(j?.data?.message)
      // console.log(j)
      if (j) {
         return j
      }
   } catch (error) {
      console.log(error)
      toast.dismiss()
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */
/*********************** ** */
export const getOrdersOfUsers = async (id) => {
   const newInstance = instance()
   try {
      const j = await newInstance.get(`orders/get-orders/${id}`)
      // toast.success(j?.data?.message)
      // console.log(j)
      if (j) {
         return j.data?.response?.data
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */
export const putOrderByOrderId = async (data) => {
   const newInstance = instance()
   try {
      toast.loading("updating")
      const j = await newInstance.post(`orders/update-order`, data)
      // console.log(j)
      toast.dismiss()
      toast.success(j?.data?.message || "successfully updated")
      // console.log(j)
      if (j) {
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   } finally {
   }
}
/*********************** ** */
export const deleteOrderByOrderId = async (userId, orderId) => {
   const newInstance = instance()
   try {
      toast.loading("deleting")
      const j = await newInstance.post(`orders/delete-order`, { orderId, userId })
      toast.dismiss()
      toast.success(j?.data?.message || "successfully deleted")
      // console.log(j)
      if (j) {
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   } finally {
   }
}
/*********************** ** */
export const postOrderForAll = async (path, data) => {
   const newInstance = instance()
   // console.log(data)
   try {
      const j = await newInstance.post(`orders/${path}`, data)
      // toast.success(j?.data?.message)
      // console.log(j)
      if (j) {
         return j
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */

/*********************** ** */
export const getLogsByUserId = async (id, dateString) => {
   const newInstance = instance()

   try {
      const j = await newInstance.get(`logs/${id}`)
      // toast.success(j?.data?.message)
      // console.log(j)
      if (j) {
         return j
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */
/*********************** ** */

/*********************** ** */
export const getStockOption = async () => {
   const newInstance = instance()

   try {
      const j = await newInstance.get(`orders/get-instruments`)
      // console.log(j)
      // toast.success(j?.data?.message)
      const expiryOption = j?.data?.map((e) => {
         return {
            value: e.symbol,
            label: e.symbol,
            tradingsymbol: e.symbol,
            expiry: e.expiry,
            lotsize: e.lotsize,
            exchange: e.exch_seg,
            symboltoken: e.token,
            instrumenttype: e.instrumenttype
         }
      })
      // console.log(expiryOption)

      if (j) {
         return expiryOption
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */
/*********************** ** */
export const getClose = async (exchange, inst_token) => {
   const newInstance = instance()

   try {
      toast.loading("fetching")
      const j = await newInstance.get(`orders/get-latest-close?exchange=${exchange}&inst_token=${inst_token}`)
      toast.dismiss()
      // console.log(j.data.price)

      if (j?.data?.price !== undefined) {
         toast.success(j?.data?.price)
      } else {
         toast.error("expired or error")
      }
   } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.message || "something went wrong"}`)
   }
}
/*********************** ** */
