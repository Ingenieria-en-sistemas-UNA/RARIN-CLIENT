/* eslint-disable no-script-url */

import React, { useContext } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { BlocsContext } from '../../store/Context';
import { StreamBuilder, Snapshot } from '../../utils/BlocBuilder/index';
import { Voucher } from '../../Models/Voucher';

export default function Deposits() {
  const { voucherBloc } = useContext(BlocsContext);
  //voucherBloc.load();
  return (
    <>
      <Title>Deposits</Title>
      <StreamBuilder
        stream={voucherBloc.vouchersStream()}
        builder={(snapshot: Snapshot<Voucher[]>) => {
          const vouchers = snapshot.data;
          let total = 0.0;
          if (vouchers) {
            vouchers.forEach(voucher => {
              voucher.items.forEach(item => {
                total += item.cant * item.product.price;
              });
            })
          }
          return (
            <Typography component="p" variant="h4">
              ${total}
            </Typography>
          )

        }}
      />
    </>
  );
}