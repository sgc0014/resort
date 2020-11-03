import React, { useState } from "react";
import {} from "react-icons/io";
import { Dropdown } from "../component/dropDown";
import { IoIosArrowDown } from "react-icons/io";
import Product from "../component/product";
import "./men.css";

export function Men(props) {
  const [productList, setproductList] = useState([
    {
      name: "full sleeve tshirt",
      price: 500,
      img: "mtshirt.jpg",
      gender: "male",
      category: "tshirt",
     size:'xs'
    },
    {
      name: "short sleeve tshirt",
      price: 600,
      img: "mtshirt1.jpg",
      category: "tshirt",
     size:'s'
    },
    {
      name: " tshirt",
      price: 300,
      img: "mtshirt2.jpg",
      category: "tshirt",
     size:'m'
    },
    {
      name: "full sleeve tshirt",
      price: 500,
      img: "mjeans.jpg",
      category: "jeans",
     size:'l'
    },
    {
      name: "short sleeve tshirt",
      price: 600,
      img: "mjeans1.jpg",
      category: "jeans",
     size:'xl'
    },
    {
      name: " tshirt",
      price: 300,
      img: "mshirt.jpg",
      category: "shirt",
     size:'xs'
    },
    {
      name: "full sleeve tshirt",
      price: 500,
      img: "mshirt1.jpg",
      category: "shirt",
     size:'s'
    },
    {
      name: "short sleeve tshirt",
      price: 600,
      img: "mshirt2.jpg",
      category: "shirt",
     size:'m'
    },
  

  ]);
  const [filterList, setFilterlist] = useState([
    {
      header: "category",
      options: ["Tshirt", "Shirt", "Jeans"],
    },
    {
      header: "Size",
      options: ["XS", "S", "M", "L", "XL"],
    },
    {
      header: "Sort By",
      options: ["High to Low", "Low to high"],
    },
    {
      header: "Gender",
      options: ["Male", "Female"],
    },
  ]);
  const [filter, setFilter] = useState({
    category: "",
    size: "",
    gender: "",
  });

  const [dropdownState, setdropdownState] = useState(false);



  const selected = (option, header) => {
    if (header.toLowerCase() == "category") {
      if (filter.category == option) {
        filter.category = "";

        console.log(filter);
      } else {
        filter.category = option;
        console.log(filter);
      }
    }
    if (header.toLowerCase() == "size") {
      if (filter.size == option) {
        filter.size = "";
        console.log(filter);
      } else {
        filter.size = option;
        console.log(filter);
      }
    }
    if (header.toLowerCase() == "gender") {
      if (filter.gender == option) {
        filter.gender = "";
        console.log(filter);
      } else {
        filter.gender = option;
        console.log(filter);
      }
    }
    filterChange();
  };
  const filterChange = () => {
    console.log("h");
    let filterredProduct = productList.filter(
      (product) =>
        filter.category.toLowerCase() == product.category.toLowerCase()
    );
    setproductList(filterredProduct);
  };
  return (
    <section className="men-section">
      <div className="header">
        <h2>Mens Clothing</h2>
        <div className="category-header-line"></div>
      </div>
      <main className="men-body">
        <div className="left">
          <div className="filter-container">
            <header className="filter-header">filter</header>
            <main>
              {filterList.map((filter) => (
                <section className="filter-dropdown">
                  <header
                    className="filter-option-header"
                    onClick={() => {
                      setdropdownState(!dropdownState);
                    }}
                  >
                    <span>{filter.header}</span>
                    {dropdownState ? (
                      <span>
                        <IoIosArrowDown className="open" />
                      </span>
                    ) : (
                      <span>
                        <IoIosArrowDown className="hide" />
                      </span>
                    )}
                  </header>
                  <ul
                    className={
                      dropdownState
                        ? "dropdown-options"
                        : "dropdown-options dropdown-options-hide"
                    }
                  >
                    {filter.options.map((option) => (
                      <li
                        className="option"
                        value={option}
                        onClick={() => selected(option, filter.header)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </main>
          </div>
        </div>
        <div className="right">
          <div className="products-container">
            {productList.map((product) => (
              <Product
                name={product.name}
                price={product.price}
                img={product.img}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}