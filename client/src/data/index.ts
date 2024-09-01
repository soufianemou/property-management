import {
  IConnectionInput,
  IPropertyInput,
  ITenantInput,
  IPayementInput,
} from "@/interfaces";

export const CONECTIONFIELDS: IConnectionInput[] = [
  { name: "username", placeholder: "Your username", type: "text" },
  {
    name: "password",
    placeholder: "Your password",
    type: "password",
  },
];

export const PROPERTYFIELDS: IPropertyInput[] = [
  { name: "name", placeholder: "Ecrivez le nom ici...", type: "text" },
  { name: "address", placeholder: "Ecrivez l'adresse ici...", type: "text" },
  { name: "units", placeholder: "Ecrivez les unités ici...", type: "number" },
  {
    name: "rental_cost",
    placeholder: "Ecrivez le coût ici...",
    type: "number",
  },
];

export const TENANTFIELDS: ITenantInput[] = [
  { name: "section", placeholder: "Ecrivez la section ici...", type: "text" },
  { name: "name", placeholder: "Ecrivez le nom ici...", type: "text" },
  {
    name: "telephone",
    placeholder: "Ecrivez le téléphone ici...",
    type: "text",
  },
];

export const PAYEMENTINPUTS: IPayementInput[] = [
  { name: "amount", placeholder: "Ecrivez le montant ici...", type: "number" },
  { name: "date", placeholder: "Ecrivez la date ici...", type: "date" },
];
