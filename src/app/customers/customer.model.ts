export interface Customer {
  customerId?: string;
  name?: string;
  location?: string;
  email?: string[];
  phone?: string;
  contactPerson?: string;
  contactRole?: string;
  internalComment?: string;
  internalRepresentative?: string;
  priority?: number;
  isMailSent?: boolean;
  $searchName?: string;
}