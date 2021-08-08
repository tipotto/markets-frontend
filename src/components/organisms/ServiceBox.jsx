import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PollIcon from '@material-ui/icons/Poll';
import topCss from '../../style/top';

const ServiceBox = ({ title, description, type }) => {
  const { serviceBox, serviceName, link, icon } = topCss();
  return (
    <Card className={serviceBox}>
      <a className={link} href={type === 'search' ? '/search' : '/analyze'}>
        <CardContent>
          {type === 'search' ? (
            <SearchIcon className={icon} />
          ) : (
            <PollIcon className={icon} />
          )}
          <h2 className={serviceName}>{title}</h2>
          <p>{description}</p>
        </CardContent>
      </a>
    </Card>
  );
};

export default ServiceBox;
