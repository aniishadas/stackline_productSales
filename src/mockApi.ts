import data from './assets/stackline_frontend_assessment_data_2021.json'
import { ProductData } from './dataType/data';

export const fetchData = (): Promise<ProductData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data)
      resolve(data[0]);
    }, 1000);
  });
};