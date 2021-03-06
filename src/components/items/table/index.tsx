import React, { forwardRef, useContext, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { BlocsContext } from '../../../store/Context';
const tableIcons = {
  Add: forwardRef<SVGSVGElement>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef<SVGSVGElement>((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef<SVGSVGElement>((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef<SVGSVGElement>((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef<SVGSVGElement>((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef<SVGSVGElement>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef<SVGSVGElement>((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef<SVGSVGElement>((props, ref) => <ViewColumn {...props} ref={ref} />)
};



interface Row {
  id: number;
  idPerson: string;
  name: string;
  createdAt: string;
  total: string;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

export default function Table() {
  const { voucherBloc } = useContext(BlocsContext);
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'Numero Voucher', field: 'id', hidden: true },
      { title: 'Nombre', field: 'name' },
      { title: 'Cedula', field: 'idPerson' },
      { title: 'Fecha', field: 'createdAt' },
      { title: 'Total', field: 'total' },
    ],
    data: [],
  });
  useEffect(() => {
    //voucherBloc.load();
    voucherBloc.vouchersStream().subscribe((vouchers) => {
      const data: Row[] = vouchers.map(({
        id,
        createdAt,
        client: {
          person: { idPerson, name }
        },
        items }) => {
        let total = 0;
        items.forEach(({ cant, product: { price } }) => total += cant * price)
        return { id: (id as number), name, idPerson: idPerson, createdAt: createdAt + '', total: '$' + total }
      })
      setState({ ...state, data });
    })
  }, [])

  return (
    <MaterialTable
      icons={tableIcons}
      title="Compras"
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: () => <SaveAltIcon />,
          tooltip: 'Download',
          onClick: (event, rowData) => {
              rowData = rowData as Row
              window.open(`https://localhost:44351/api/pdfs/voucher/${rowData.id}`, '_blank');
          }
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        exportButton: true
      }}
    />
  );
}