
type Table={
    id: number;
  name: string | null;
  table_no: string;
  status: number;
  is_bar: number;
  zone_id: number;
  guest_qty: number;
  table_status: number;
  color: string;
  sale_id: number | null;
  url: string;
}

export type tableData ={
    zone_id:number,
    zone_name:string,
    tables:Table[]
}