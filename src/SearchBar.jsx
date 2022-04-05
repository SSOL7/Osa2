import React from "react";

export default function SearchBar(props) {

  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search for a city"
      />
      <button type="submit">Search</button>
    </form>
  );
}