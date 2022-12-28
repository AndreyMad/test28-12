import React, { useRef, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip';

const Card = ({ photo, name, position, email, phone }) => {
  const parentBlock = useRef(null);
  const [maxSymbols, setMaxSymbols] = useState();
  useEffect(() => {
    const width = parentBlock.current.getBoundingClientRect().width - 40;
    setMaxSymbols(Math.round(width / 8));
  }, []);

  return (
    <div ref={parentBlock} className="userCard__wrapper">
      <img src={photo} className="userCard__photo" alt="User photo" />
      {
        name.length < maxSymbols
          ? <span className="userCard__name">{name}</span>
          : <Tooltip title={name} placement="bottom">
            <span className="userCard__name userCard__email-tooltiped">{name.slice(0, maxSymbols - 3) + '...'}</span>
          </Tooltip>
      }
      {
        position.length < maxSymbols
          ? <span className="userCard__position">{position}</span>
          : <Tooltip title={position} placement="bottom">
            <span className="userCard__position userCard__position-tooltiped">{position.slice(0, maxSymbols - 3) + '...'}</span>
          </Tooltip>
      }
      {
        email.length < maxSymbols
          ? <span className="userCard__email" >{email}</span>
          : <Tooltip title={email} placement="bottom">
            <span className="userCard__email userCard__email-tooltiped">{email.slice(0, maxSymbols - 3) + '...'}</span>
          </Tooltip>
      }
      <span className="userCard__phone" >{phone}</span>
    </div>
  )
}

export default Card;
