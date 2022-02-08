import React from 'react';
import { PropsType } from './product-page-content.types';

export const ProductPageContent = ({ product }: PropsType) => {
  return <div>{product.title}</div>;
};
