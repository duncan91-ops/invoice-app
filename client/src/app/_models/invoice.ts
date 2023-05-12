export interface IItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IInvoice {
  id?: string;
  invoice_no?: string;
  description: string;
  payment_terms: number;
  payment_due?: string;
  sender_address: {
    country: string;
    city: string;
    street: string;
    post_code: string;
  };
  client_name: string;
  client_email: string;
  client_address: {
    country: string;
    city: string;
    street: string;
    post_code: string;
  };
  status: string;
  items: IItem[];
  total: number;
}
