import { Input } from "reactstrap"
import { isoToLocale } from "../utils"

export const stockColumnList = [
   {
      name: "ID",
      sortable: true,
      minWidth: "70px",
      maxWidth: "70px",
      selector: (row) => row._id
   },
   {
      name: "STOCK NAME",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.name
   },

   {
      name: "INSTRUMENT TOKEN",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.brokerDetail?.symboltoken
   },
   {
      name: "EXCHANGE",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.brokerDetail?.exchange
   },
   {
      name: "LOT SIZE",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.brokerDetail?.lotsize
   },
   {
      name: "EXPIRY DATE",
      sortable: true,
      minWidth: "150px",
      selector: (row) => row.brokerDetail?.expiry
   },
   {
      name: "STATUS",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.status
   },
   {
      name: "TRADING SYMBOL",
      sortable: true,
      minWidth: "300px",
      selector: (row) => row.brokerDetail?.tradingsymbol
   },
   {
      name: "ACTIVE",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => (
         <div className="form-switch form-check-success">
            <Input type="switch" id="" onChange={(e) => console.log(e.target.checked)} name="success" disabled checked={row.isActiveFromAdmin} />
         </div>
      )
   }
]

export const userColumnList = [
   {
      name: "ID",
      sortable: true,
      minwidth: "150px",
      selector: (row) => row._id
   },

   {
      name: "Email",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.email
   },
   {
      name: "Contact No",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.mobileNo
   },
   {
      name: "STOCK DETAIL",
      sortable: true,
      minwidth: "150px",
      selector: (row) => (
         <div className="">
            {row.stockDetail?.map((e, index) => {
               return (
                  <div className="d-flex justify-content-between" key={index}>
                     <span>{e.stockName} :</span> <span>{e.quantity}</span>
                  </div>
               )
            })}
         </div>
      )
   },
   {
      name: "Name",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.name
   },
   {
      name: "ACTIVE",
      sortable: true,
      minwidth: "150px",
      selector: (row) => (
         <div className="form-switch form-check-success">
            <Input type="switch" id="" onChange={(e) => console.log(e.target.checked)} name="success" disabled checked={row.isApprovedFromAdmin} />
         </div>
      )
   }
]
export const unloggedUserColumnList = [
   {
      name: "ID",
      sortable: true,
      minwidth: "150px",
      selector: (row) => row.userId
   },
   {
      name: "Name",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.name
   },
   // {
   //    name: "Email",
   //    sortable: true,
   //    minwidth: "100px"
   //    // selector: (row) => row.email
   // },
   {
      name: "Contact No",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.no
   }
   // {
   //    name: "ACTIVE",
   //    sortable: true,
   //    minwidth: "150px",
   //    selector: (row) => (
   //       <div className="form-switch form-check-success">
   //          <Input type="switch" id="" onChange={(e) => console.log(e.target.checked)} name="success" disabled checked={row.isApprovedFromAdmin} />
   //       </div>
   //    )
   // }
]
export const viewUserPositionColumnList = [
   {
      name: "Trading Symbol",
      sortable: true,
      minwidth: "150px",
      selector: (row) => row.tradingsymbol
   },
   {
      name: "Buy Price",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.buyavgprice
   },
   {
      name: "Sell Price",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.sellavgprice
   },
   {
      name: "Buy Quantity",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.buyqty
   },
   {
      name: "Sell Quantity",
      sortable: true,
      maxWidth: "150px",
      selector: (row) => row.sellqty
   },
   {
      name: "Net Quantity",
      sortable: true,
      maxWidth: "150px",
      selector: (row) => row.netqty
   }
]
export const viewUserCFPositionColumnList = [
   {
      name: "Trading Symbol",
      sortable: true,
      minwidth: "150px",
      selector: (row) => row.tradingsymbol
   },
   {
      name: "Buy Price",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.cfbuyavgprice
   },
   {
      name: "Sell Price",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.cfsellavgprice
   },
   {
      name: "Buy Quantity",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.cfbuyqty
   },
   {
      name: "Sell Quantity",
      sortable: true,
      maxWidth: "150px",
      selector: (row) => row.cfsellqty
   }
]
export const viewUserLogsColumnList = [
   {
      name: "Order ID",
      sortable: true,
      minwidth: "150px",
      selector: (row) => row.orderId
   },
   {
      name: "Trading Symbol",
      sortable: true,
      maxWidth: "150px",
      selector: (row) => row.tradingsymbol
   },
   {
      name: "Price",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.price
   },
   {
      name: "Trade Status",
      sortable: true,
      maxWidth: "120px",
      selector: (row) => row.transactiontype
   },

   {
      name: "quantity",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.quantity
   },
   {
      name: "Order Status",
      sortable: true,
      maxWidth: "150px",
      selector: (row) => row.orderStatus
   },
   {
      name: "Date",
      sortable: true,
      minwidth: "150px",
      selector: (row) => isoToLocale(row.time)
   }
]

export const viewUserStockListColumnList = [
   {
      name: "Stock ID",
      sortable: true,
      minwidth: "150px",
      selector: (row) => row.stockId
   },
   {
      name: "Stock Name",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.stockName
   },
   {
      name: "Quantity",
      sortable: true,
      minwidth: "100px",
      selector: (row) => row.quantity
   },
   {
      name: "Status",
      sortable: true,
      minwidth: "150px",
      selector: (row) => (
         <div className="form-switch form-check-success">
            <Input type="switch" id="" onChange={(e) => console.log(e.target.checked)} name="success" disabled checked={row.isActive} />
         </div>
      )
   }
]
