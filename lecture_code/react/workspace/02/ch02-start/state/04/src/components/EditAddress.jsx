import { Fragment } from "react";

export default function EditAddress({ addressBook, handleAddressChange }) {
  const list = addressBook.map((address) => {
    return (
      <Fragment key={address.id}>
        <label htmlFor={address.id}></label>
        <input
          type="text"
          id={address.id}
          name={address.name}
          value={address.value}
          onChange={handleAddressChange}
        />
        <br />
      </Fragment>
    );
  });
  return list;
}
