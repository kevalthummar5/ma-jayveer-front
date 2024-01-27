import { useState } from "react"
import { Button, Col, Input, Row } from "reactstrap"
import { deleteOrderByOrderId, putOrderByOrderId } from "../../myApiCenter"

const UpdateOrder = (props) => {
   const [price, setprice] = useState(props.data.price)
   return (
      <div className="d-flex gap-2 flex-row flex-wrap">
         <p className="h4 me-auto ">{props.data?.tradingsymbol}</p>
         <Input value={price} required onChange={(e) => setprice(e.target.value)} type="text" placeholder="Enter price" />
         <p className="h4 me-auto ">{props.data?.transactiontype}</p>
         <Button
            type="button"
            className="me-auto rounded-pill"
            onClick={async () => {
               delete props.data.price
               // console.log(price)
               await putOrderByOrderId({ userId: props.userId, price: +price, ...props.data })
               props.getOrderData()
            }}
            color="success"
         >
            Update
         </Button>
         <Button
            type="button"
            className="me-auto rounded-pill"
            onClick={async () => {
               await deleteOrderByOrderId(props.userId, props.data?.orderid)
               props.getOrderData()
            }}
            color="danger"
         >
            Delete
         </Button>
      </div>
   )
}
export default UpdateOrder
