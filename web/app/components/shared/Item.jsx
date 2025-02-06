import React from "react";

const Item = ({ name, icon, styles, info }) => {
  return (
    <div
      className={`${styles} flex items-center bg-white/20 gap-3 text-gray-700 border border-gray-700/[0.2] rounded-xl p-2`}
    >
      <h2 className="text-lg text-gray-800 font-bold">{name}</h2>
      {icon && <img className="h-5" src={icon} alt={name} />}
      <h2 className="text-gray-600">{info}</h2>
    </div>
  );
};

export default Item;
