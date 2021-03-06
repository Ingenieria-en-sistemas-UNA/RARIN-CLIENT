import React, { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, Avatar, Typography, Divider, Button } from '@material-ui/core';
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

const AccountProfile: FC = (props: any) => {
  localStorage.setItem('route', '/profile');
  const { authBloc } = useContext(BlocsContext);
  const classes = useStyles();
  const user = authBloc.getClient();
  return (
    <Card
      className={classes.root}
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
              {user.person.idPerson}
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
export default AccountProfile;