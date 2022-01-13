import React from "react";

interface Product {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  color: string;
}

interface ItemProps {
  product: Product;
}

function Item({ product }: ItemProps) {
  return (
    <div key={product.id} className="relative">
      <a href={product.href}>
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
        </div>
      </a>
      <div className="mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className=" inset-0" />
              {product.name}
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
        <button onClick={() => alert("add to cart")}>add to cart</button>
      </div>
    </div>
  );
}

export default Item;
