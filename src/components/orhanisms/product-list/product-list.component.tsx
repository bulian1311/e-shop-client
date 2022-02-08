import React from 'react';
import { ProductCard } from '../../melecules';
import { PropsType } from './product-list.types';

export const ProductList = ({ products }: PropsType) => {
  return (
    <div className="max-w-2xl py-16 px-4">
      <h2 className="mb-6 text-2xl font-extrabold text-gray-900">
        Product list
      </h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </div>
  );
};
