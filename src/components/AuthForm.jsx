import React from "react";
import Button from "./Button";

function AuthForm({
  title,
  fields,
  onSubmit,
  error,
  submitLabel,
  submitClassName = "edit-button",
  children,
  className = "",
}) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <h2 className="edit-title">{title}</h2>
      {error && <div className="login-error">{error}</div>}
      {fields.map((field) => (
        <div className="input-wrapper" key={field.id}>
          <label htmlFor={field.id}>{field.label}</label>
          <input
            type={field.type}
            id={field.id}
            value={field.value}
            onChange={field.onChange}
            autoComplete={field.autoComplete}
            disabled={field.disabled}
            className={field.className}
            required={field.required}
          />
        </div>
      ))}
      {children}
      {submitLabel && (
        <Button type="submit" className={submitClassName}>
          {submitLabel}
        </Button>
      )}
    </form>
  );
}

export default AuthForm;