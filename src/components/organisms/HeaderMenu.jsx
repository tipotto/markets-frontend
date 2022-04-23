import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CustomButton = styled(Button)({
  fontSize: '1.5rem',
  fontWeight: 'lighter',
  textTransform: 'lowercase',
  color: '#fff',
});

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePageTransition = (event, path) => {
    handleClose();
    window.location.href = path;
  };

  return (
    <div>
      <CustomButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Services
      </CustomButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(e) => handlePageTransition(e, '/search')}>
          フリマ一括検索ツール
        </MenuItem>
        <MenuItem onClick={(e) => handlePageTransition(e, '/analyze')}>
          フリマ価格算出ツール
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderMenu;
