import { Label } from "reactstrap"

const rowExpiryOption = [
   {
      instrument_token: "66049031",
      exchange_token: "258004",
      tradingsymbol: "CRUDEOILM23DECFUT",
      name: "CRUDEOILM",
      last_price: 0,
      expiry: "2023-12-18T00:00:00.000Z",
      strike: 0,
      tick_size: 1,
      lot_size: 1,
      instrument_type: "FUT",
      segment: "MCX-FUT",
      exchange: "MCX"
   },
   {
      instrument_token: "65859335",
      exchange_token: "257263",
      tradingsymbol: "CRUDEOILM23NOVFUT",
      name: "CRUDEOILM",
      last_price: 0,
      expiry: "2023-11-17T00:00:00.000Z",
      strike: 0,
      tick_size: 1,
      lot_size: 1,
      instrument_type: "FUT",
      segment: "MCX-FUT",
      exchange: "MCX"
   },
   {
      instrument_token: "66715655",
      exchange_token: "260608",
      tradingsymbol: "CRUDEOILM24FEBFUT",
      name: "CRUDEOILM",
      last_price: 0,
      expiry: "2024-02-16T00:00:00.000Z",
      strike: 0,
      tick_size: 1,
      lot_size: 1,
      instrument_type: "FUT",
      segment: "MCX-FUT",
      exchange: "MCX"
   },
   {
      instrument_token: "66715143",
      exchange_token: "260606",
      tradingsymbol: "CRUDEOILM24JANFUT",
      name: "CRUDEOILM",
      last_price: 0,
      expiry: "2024-01-19T00:00:00.000Z",
      strike: 0,
      tick_size: 1,
      lot_size: 1,
      instrument_type: "FUT",
      segment: "MCX-FUT",
      exchange: "MCX"
   },
   {
      instrument_token: "15776514",
      exchange_token: "61627",
      tradingsymbol: "BANKNIFTY23DECFUT",
      name: "BANKNIFTY",
      last_price: 0,
      expiry: "2023-12-28T00:00:00.000Z",
      strike: 0,
      tick_size: 0.05,
      lot_size: 15,
      instrument_type: "FUT",
      segment: "NFO-FUT",
      exchange: "NFO"
   },
   {
      instrument_token: "14827266",
      exchange_token: "57919",
      tradingsymbol: "BANKNIFTY23NOVFUT",
      name: "BANKNIFTY",
      last_price: 0,
      expiry: "2023-11-30T00:00:00.000Z",
      strike: 0,
      tick_size: 0.05,
      lot_size: 15,
      instrument_type: "FUT",
      segment: "NFO-FUT",
      exchange: "NFO"
   },
   {
      instrument_token: "8979970",
      exchange_token: "35078",
      tradingsymbol: "BANKNIFTY23OCTFUT",
      name: "BANKNIFTY",
      last_price: 0,
      expiry: "2023-10-26T00:00:00.000Z",
      strike: 0,
      tick_size: 0.05,
      lot_size: 15,
      instrument_type: "FUT",
      segment: "NFO-FUT",
      exchange: "NFO"
   },
   {
      instrument_token: "16178434",
      exchange_token: "63197",
      tradingsymbol: "NIFTY23DECFUT",
      name: "NIFTY",
      last_price: 0,
      expiry: "2023-12-28T00:00:00.000Z",
      strike: 0,
      tick_size: 0.05,
      lot_size: 50,
      instrument_type: "FUT",
      segment: "NFO-FUT",
      exchange: "NFO"
   },
   {
      instrument_token: "14827522",
      exchange_token: "57920",
      tradingsymbol: "NIFTY23NOVFUT",
      name: "NIFTY",
      last_price: 0,
      expiry: "2023-11-30T00:00:00.000Z",
      strike: 0,
      tick_size: 0.05,
      lot_size: 50,
      instrument_type: "FUT",
      segment: "NFO-FUT",
      exchange: "NFO"
   },
   {
      instrument_token: "14161410",
      exchange_token: "55318",
      tradingsymbol: "NIFTY24JANFUT",
      name: "NIFTY",
      last_price: 0,
      expiry: "2024-01-25T00:00:00.000Z",
      strike: 0,
      tick_size: 0.05,
      lot_size: 50,
      instrument_type: "FUT",
      segment: "NFO-FUT",
      exchange: "NFO"
   }
]
export const expiryOption = rowExpiryOption.map((e) => {
   return {
      value: e.tradingsymbol,
      label: e.tradingsymbol,
      tradingSymbol: e.tradingsymbol,
      expiryDate: e.expiry,
      lotSize: e.lot_size,
      exchange: e.exchange,
      instrumentToken: e.instrument_token,
      instrumentType: "FUT"
   }
})

export const statusOption = [
   { value: "BUY", label: "BUY" },
   { value: "SELL", label: "SELL" }
]
