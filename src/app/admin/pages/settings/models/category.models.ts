import { GET_STORE_ID } from "../../../../globals/_classes/functions";

export class Category{
  id:number;
  store_id:number = GET_STORE_ID();
  name:string;
  parent_id?:number | string;
  parent_name?:number;
  url:string;
  uuid?:string ;
  children?: boolean;
}