import "./MenuItems.css";
import React, { useEffect, useState } from "react";
import { createNourishments, getAllNourishments } from "../../../services/menu";
import MenuItem from "../MenuItem/MenuItem";
import { demoItems } from "../../../demoData";

const MenuItems = () => {
  const [allNourishments, setAllNourishments] = useState([]);

  useEffect(() => {
    getAllNourishments().then((res) => {
      if (res.data.data.length > 0) {
        setAllNourishments(res.data.data);
      } else {
        demoItems.forEach(async (item) => {
          await createNourishments(item.image, item.description, item.price);
        });
        getAllNourishments().then((res) => {
          setAllNourishments(res.data.data);
        })
      }
    });
  }, []);

  return (
    <div className="menuItems">
      {allNourishments.length > 0 ? (
        allNourishments.map((item) => {
          return (
            <MenuItem
              key={item._id}
              id={item._id}
              img={item.image}
              description={item.description}
              price={item.price}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuItems;
