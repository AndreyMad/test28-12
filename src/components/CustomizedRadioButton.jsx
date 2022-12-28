import { Radio, styled } from '@mui/material';
import React from 'react'

export default function CustomizedRadioButton(props) {

  const BpIcon = styled('span')(() => ({
    borderRadius: '50%',
    marginRight: '2px',
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    '.Mui-focusVisible &': {
      outline: '10px auto rgba(19,124,189,0)',
      outlineOffset: 1,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#fff !important',
    position: 'relative',
    display: 'flex',
    boxShadow: 'inset 0 0 0 1px rgba(	0, 189, 211,2), inset 0 -1px 0 rgba(	0, 189, 211,.1)',
    backgroundImage: '#00bdd3',
    '&:before': {
      display: 'block',
      margin: 'auto',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: '#00bdd3',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#00BDD3',
    },
  });

  return (
    <Radio
      {...props}
      icon={<BpIcon />}
      checkedIcon={<BpCheckedIcon />}
    />
  )
}
