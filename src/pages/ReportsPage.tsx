import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(1, 0, 2),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[500],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },

}));

const tiers = [
  {
    title: 'Categoría',
    description: [
      'reporte de categoría',
    ],
    go: () => {
      window.open(`https://localhost:44351/api/pdfs/categories`, '_blank');
    }

  },
  {
    title: 'Cliente',
    description: [
      'reporte de cliente',
    ],
    go: () => {
      window.open(`https://localhost:44351/api/pdfs/client`, '_blank');
    }

  },
  {
    title: 'Facturas',

    description: [
      'reporte de facturas',
    ],
    go: () => {
      window.open(`https://localhost:44351/api/pdfs/voucher`, '_blank');
    }
  },
];

export default function ReportsPage() {
  localStorage.setItem('route', '/reports');
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='sm' component='main' className={classes.heroContent}>
        <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
          Reportes
        </Typography>
        <Typography variant='h5' align='center' color='textSecondary' component='p'>
          Aquí puede encontar todos los reportes que necesitas
        </Typography>
      </Container>
      <Container maxWidth='md' component='main'>
        <Grid container spacing={5} alignItems='flex-start' justify='space-around'>
          {tiers.map(tier => (
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component='h2' variant='h3' color='textPrimary'>

                    </Typography>

                  </div>
                  <ul>
                    {tier.description.map(line => (
                      <Typography component='li' variant='subtitle1' align='center' key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                    <IconButton edge='start'
                      color='secondary'
                      arial-label='open drawer'
                      onClick={() => tier.go()}
                    >
                    <AssignmentIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </>
  );
}