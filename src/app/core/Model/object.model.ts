export class User {
  name!: string;
  password!: string;
  uploadPhoto!: string;
  role!: string;
  phnNumber!: string;
  address!: Address;
  gender!: string;
  email!: string;
  dob!: string;
  agreetc!: boolean;
  age!: number;
}

export class Address {
  id!: number;
  addLine1!: string;
  addLine2!: string;
  country!: string;
  state!: string;
  city!: string;
}

export class Product {
  id!: number;
  name!: string;
  uploadPhoto!: string;
  Description!: string;
  mrp!: number;
  dp!: number;
  status!: boolean;
}

export class order {
  id!: number;
  userId!: number;
  sellerId!: number;
  product!: Product;
  deliveryAddress!: Address;
  contact!: number;
  dateTime!: string;
}
