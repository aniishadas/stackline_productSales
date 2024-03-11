  export interface ProductData {
    id: string;
    title: string;
    image: string;
    subtitle: string;
    brand: string;
    reviews: { customer: string; review: string; score: number }[];
    retailer: string;
    details: string[];
    tags: string[];
    sales: SaleData[];
  }

  export interface SaleData {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }