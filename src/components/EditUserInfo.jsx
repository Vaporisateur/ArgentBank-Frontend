import React, { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import Button from "./Button";

function EditUserInfo({ user, handleUpdateUserName, onCancel }) {
  const [newUserName, setNewUserName] = useState(user?.userName || "");

  useEffect(() => {
    setNewUserName(user?.userName || "");
  }, [user]);

  const fields = [
    {
      id: "userName",
      label: "User name:",
      type: "text",
      value: newUserName,
      onChange: (e) => setNewUserName(e.target.value),
      required: true,
    },
    {
      id: "firstName",
      label: "First name:",
      type: "text",
      value: user.firstName,
      disabled: true,
      className: "input-disabled",
    },
    {
      id: "lastName",
      label: "Last name:",
      type: "text",
      value: user.lastName,
      disabled: true,
      className: "input-disabled",
    },
  ];

  return (
    <AuthForm
      title="Edit user info"
      fields={fields}
      onSubmit={e => {
        e.preventDefault();
        handleUpdateUserName(newUserName, onCancel);
      }}
      className="edit-form input-row"
    >
      <div className="edit-buttons-wrapper">
        <Button type="submit" className="edit-button">
          Save
        </Button>
        <Button type="button" className="edit-button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </AuthForm>
  );
}

export default EditUserInfo;