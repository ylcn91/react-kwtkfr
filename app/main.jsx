import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { process } from '@progress/kendo-data-query';
import { Grid,GridToolbar, GridColumn as Column } from '@progress/kendo-react-grid';
import { ColumnMenu, ColumnMenuCheckboxFilter } from './columnMenu';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import products from './products.json';

const createDataState = dataState => {
  return {
    result: process(products.slice(0), dataState),
    dataState: dataState
  };
};

const App = () => {
  let initialState = createDataState({
    take: 8,
    skip: 0
  });
  const [result, setResult] = React.useState(initialState.result);
  const [dataState, setDataState] = React.useState(initialState.dataState);

  const dataStateChange = event => {
    let updatedState = createDataState(event.dataState);
    setResult(updatedState.result);
    setDataState(updatedState.dataState);
  };

  const _export = React.useRef(null);

  const excelExport = () => {
    if (_export.current !== null) {
      _export.current.save();
    }
  };

  return (
    <ExcelExport data={products} ref={_export}>
    <Grid
      data={result}
      {...dataState}
      onDataStateChange={dataStateChange}
      sortable={true}
      pageable={true}
      pageSize={8}
    >
       <GridToolbar>
          <button
            title="Export Excel"
            className="k-button k-primary"
            onClick={excelExport}
          >
            Export to Excel
          </button>
        </GridToolbar>
      <Column
        field="ProductID"
        title="Product Id"
        filter={'numeric'}
        columnMenu={ColumnMenuCheckboxFilter}
      />
      <Column field="ProductName" columnMenu={ColumnMenuCheckboxFilter} />
      <Column field="UnitPrice" filter={'numeric'} columnMenu={ColumnMenu} />
      <Column
        field="Discontinued"
        filter={'boolean'}
        columnMenu={ColumnMenuCheckboxFilter}
      />
    </Grid>
    </ExcelExport>
  );
};

ReactDOM.render(<App />, document.querySelector('my-app'));
