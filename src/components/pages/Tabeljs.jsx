import React from 'react';
import MaterialTable from 'material-table';


export default function Tabeljs({data1}) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'User ID', field: 'userId' },
      { title: 'ID', field: 'id' },
      { title: 'Title', field: 'title'},
      { title: 'Body', field: 'body'},
      ],
    data1: [{body: "quia et suscipit↵suscipit recusandae consequuntur expedita et cum↵reprehenderit molestiae ut ut quas totam↵nostrum rerum est autem sunt rem eveniet architecto",
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    userId: 1}],
  });

  return (
    <MaterialTable
      title="JSON Placeholder"
      columns={state.columns}
      data={state.data1}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}