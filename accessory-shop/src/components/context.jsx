import { createContext } from 'react';

export const TotalPriceContext = createContext({
  totalPrice: 0,
  setTotalPrice: () => {},
});
