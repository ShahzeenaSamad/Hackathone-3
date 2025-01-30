import { groq } from "next-sanity";

export const AllProduct = groq `*[_type == "product"]`;
export const four = groq `*[_type == "product"][0..3]`