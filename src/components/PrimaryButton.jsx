import { Button } from 'antd';
import React from 'react';

const PrimaryButton = ({
  className = "",
  btnText,
  onClick = null,
  customStyles = {},
  disabled = false,
}) => {
  return (
    <Button
      style={{ ...customStyles }}
      className={className ? `primaryBtn ${className}` : "primaryBtn"}
      type="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </Button>
  )
}
export default PrimaryButton;