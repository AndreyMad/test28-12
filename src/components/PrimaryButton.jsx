import { Button } from 'antd';
import React from 'react';

const PrimaryButton = ({
  className = "",
  btnText,
  onClick = null,
  customStyles = {},
  disabled = false,
  link = "",
}) => {
  return (
    <Button
      style={{ ...customStyles }}
      className={className ? `primaryBtn ${className}` : "primaryBtn"}
      type="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {link ? <a href={link}>{btnText}</a> : <span>{btnText}</span>}
    </Button>
  )
}
export default PrimaryButton;