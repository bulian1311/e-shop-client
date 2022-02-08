import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropsType } from './product-card.types';

export const ProductCard = ({ product }: PropsType) => {
  const { handle, title } = product.node;
  const { altText, url } = product.node.images.edges[0].node;

  return (
    <Link href={`/products/${handle}`}>
      <a className="group">
        <div className="w-full overflow-hidden rounded-3xl bg-gray-200">
          <div className="relative h-72 group-hover:opacity-75">
            <Image src={url} alt={altText} layout="fill" objectFit="cover" />
          </div>
        </div>
      </a>
    </Link>
  );
};
