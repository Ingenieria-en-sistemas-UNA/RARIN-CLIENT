import React, { FC, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Card,CardActions,CardContent,Avatar,Typography,Divider,Button,LinearProgress} from '@material-ui/core';
import { BlocsContext } from '../store/Context';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
}));

const AccountProfile: FC = (props : any) => {
  const { className, ...rest } = props;
  const { authBloc } = useContext(BlocsContext);
  const classes = useStyles();
  const user = authBloc.getClient();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h6"
            >
              Informacion de Cuenta
            </Typography>

            <Typography
              className={classes.details}
              color="textSecondary"
              variant="body1"
            >
              {user.person.id}
            </Typography>

            <Typography
              className={classes.details}
              color="textSecondary"
              variant="body1"
            >
             {user.person.name}  {user.person.lastName}
            </Typography>

            <Typography
              className={classes.details}
              color="textSecondary"
              variant="body1"
            >
            
            </Typography>

          </div>
          <Avatar alt="Remy Sharp" src="https://www.tipsaludable.com/wp-content/uploads/2017/08/b1-8.jpg" className={classes.avatar} />
        </div>

      </CardContent>
      <Divider />
      <CardActions>
        
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;