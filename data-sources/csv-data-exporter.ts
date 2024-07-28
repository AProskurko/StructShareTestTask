import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface ProductData {
  link: string;
  name: string;
  price: string;
}

export function getProductData(filePath: string): Promise<ProductData[]> {
  return new Promise((resolve, reject) => {
    const results: ProductData[] = [];
    const fullPath = path.resolve(__dirname, filePath);

    fs.createReadStream(fullPath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
