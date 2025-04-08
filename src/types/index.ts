export interface WaterBill {
  invoiceNumber: string;
  month: string;
  issueDate: string;
  meterNumber: string;
  customerName: string;
  currentReading: number;
  previousReading: number;
  consumption: number;
  ratePerCubicMeter: number;
  amountDue: number;
  previousDebt: number;
  totalAmount: number;
  dueDate: string;
  reader: string;
  numberToWords: (num: number) => string;
}