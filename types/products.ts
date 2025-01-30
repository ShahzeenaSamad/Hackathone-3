export interface Product {
    imageUrl: any;
      _id: string;
      productName: string;
      _type: "product";
      category: string;
      price: number;
      inventory: number;
      colors: string[];
      status: string;
      image? : {
          asset: {
              _ref: string;
              _type: "image";
          };
      };
      description? : string;
     slug: {
      _type: "slug";
      current: string;
  };
  
  }