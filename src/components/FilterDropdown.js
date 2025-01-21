import React from "react";

const FilterDropdown = ({ setSelectedCategory, products }) => {
  const categories = [
    ...new Set(products.map((product) => product.category?.name)),
  ].filter(Boolean);

  return (
    <select
      className="select-field my-3"
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
