import React from "react";

const Input = ({
  label,
  name,
  value,
  type,
  placeholder,
  onClick,
  onChange,
}) => {
  return (
    <div className="grid gap-y-3">
      {label ? (
        <label className="font-semibold text-blue-900">{label}</label>
      ) : (
        <></>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onClick={onClick}
        onChange={onChange}
        className="w-full h-12 p-3 rounded-md border border-blue-900 bg-white focus:outline-none"
      />
    </div>
  );
};

export default Input;
