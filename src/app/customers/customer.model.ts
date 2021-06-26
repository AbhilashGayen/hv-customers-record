export interface Customer {
  _id?: string;
  vendorCode?: string;
  name?: string;
  location?: string;
  email?: string[];
  phone?: string[];
  contactPerson?: string[];
  contactRole?: string;
  internalComment?: string;
  internalRepresentative?: string;
  priority?: number;
  isMailSent?: boolean;
  lastEdit?: LastEdit;
  $searchName?: string;
}

interface LastEdit {
  by?: string;
  time?: string;
}
