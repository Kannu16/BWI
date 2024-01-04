
export const sortProductsByPrice = (products, order = 'asc') => {
    const sortedProducts = [...products];
  
    sortedProducts.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
  
      if (order === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  
    return sortedProducts;
  };
  