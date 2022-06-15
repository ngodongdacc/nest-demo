interface LineItem {
  itemId: number;
  itemCode: number;
  itemName: string;
  quantity: number;
  price: number;
  totalLineDiscount: number;
  amount: number;
}
export class Transaction {
  id: string;
  type: string;
  storeCode: string; // StoreCode
  storeCodeOrigin: string; // StoreCode
  brandCode: string;
  billNumber: string; // bo
  mobile: string; // comments
  purchaseTime: null;
  billDate: string; // TransactionDate
  sync: boolean;
  billAmount: number; // BillAmount
  grossAmount: number; // BillDiscount
  lineItems: LineItem[];
}
