export interface Document{
  barcode:string
  pages:string[]
}

export interface MessageInfo{
  type:boolean
  head_message:string
  content_message:string
  open:boolean
  documentCode:string[]
  yes():void
  no():void
}
