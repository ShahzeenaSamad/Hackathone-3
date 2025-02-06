import { Rule } from "@sanity/types";

export default {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "firstName",
      type: "string",
      title: "First Name",
      validation: (Rule: Rule) => Rule.required().min(1).max(50),
    },
    {
      name: "lastName",
      type: "string",
      title: "Last Name",
      validation: (Rule: Rule) => Rule.required().min(1).max(50),
    },
    {
      name: "address",
      type: "string",
      title: "Address",
      validation: (Rule: Rule) => Rule.required().min(5).max(200),
    },
    {
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule: Rule) => Rule.required().min(1).max(100),
    },
    {
      name: "zipCode",
      type: "string",
      title: "Zip Code",
      validation: (Rule: Rule) => Rule.required().min(5).max(10),
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
      validation: (Rule: Rule) => Rule.required().min(10).max(15),
    },
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule: Rule) => Rule.required().email(),
    },
   
    {
      name: "cartItems",
      type: "array",
      title: "Cart Items",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (Rule: Rule) => Rule.required(),
    },
   
    {
      name: "discount",
      type: "number",
      title: "Discount",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: "total",
      type: "number",
      title: "Total",
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: "orderStatus",
      type: "string",
      title: "Order Status",
      options: {
        list: [
          { title: "Pending", value: "Pending" },
          { title: "Completed", value: "Completed" },
          { title: "Shipped", value: "Shipped" },
          { title: "Cancelled", value: "Cancelled" },
        ],
        layout: "radio", // ✅ Moved inside options
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  initialValue: { orderStatus: "Pending" }, // ✅ Fixed default value
};
