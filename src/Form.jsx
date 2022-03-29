import React from "react";

export default function Form(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder="Add Person"
      />
      <input 
        type="text" 
        value={props.number}
        onChange={props.onNumberChange}
        placeholder="Add Number"
      />
      <button type="submit">Add person</button>
    </form>
  );
}

