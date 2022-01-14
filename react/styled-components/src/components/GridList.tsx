import React from "react";

const data = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: "",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

function GridList() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {data.map((item) => (
        <div
          style={{
            backgroundColor: "gray",
            width: "300px",
            margin: "8px",
          }}
        >
          <img
            src={item.imageSrc}
            alt={`${item.name} image`}
            width="100%"
            height="fit-content"
          />
          <div>{item.name}</div>
          <div>{item.price}</div>
          <button onClick={() => alert("addToCart")}>add to cart</button>
        </div>
      ))}
    </div>
  );
}

export default GridList;
