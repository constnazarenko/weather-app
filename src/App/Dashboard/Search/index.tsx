import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeExplicitContext } from "../../index";

export interface SearchInterface {
  onChange: (cityName: string) => void;
}
export const Search = (props: SearchInterface) => {
  const { themeExplicit, setThemeExplicit } = useContext(ThemeExplicitContext);

  const labelClasses = classNames({
    "input-group-text": true,
    "bg-dark text-white-50 border-light border-opacity-25":
      themeExplicit === "dark",
  });
  const inputClasses = classNames({
    "form-control": true,
    "bg-dark text-white-50 border-light border-opacity-25":
      themeExplicit === "dark",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <>
      <div className="input-group mb-3">
        <span className={labelClasses}>Search city by name</span>
        <input type="text" className={inputClasses} onChange={handleChange} />
      </div>
    </>
  );
};

export default Search;
