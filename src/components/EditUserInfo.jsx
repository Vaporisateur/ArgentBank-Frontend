import React, { useState, useEffect } from "react";
import Button from "./Button";

function EditUserInfo({ user, token, handleUpdateUserName, onCancel }) {
  const [newUserName, setNewUserName] = useState(user?.userName || "");

  // Si l'utilisateur change (changement de profil, rechargement), on resynchronise le champ
  useEffect(() => {
    setNewUserName(user?.userName || "");
  }, [user]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleUpdateUserName(newUserName, onCancel);
      }}
      className="edit-form input-row"
    >
      <h2 className="edit-title">Edit user info</h2>
      <div className="input-wrapper">
        <label htmlFor="userName">User name:</label>
        <input
          type="text"
          id="userName"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="firstName">First name:</label>
        <input
          type="text"
          id="firstName"
          value={user.firstName}
          disabled
          className="input-disabled"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="lastName">Last name:</label>
        <input
          type="text"
          id="lastName"
          value={user.lastName}
          disabled
          className="input-disabled"
        />
      </div>
      <div className="edit-buttons-wrapper">
        <Button type="submit" className="edit-button">
          Save
        </Button>
        <Button type="button" className="edit-button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default EditUserInfo;
