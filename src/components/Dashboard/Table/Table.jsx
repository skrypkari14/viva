// Не забудьте импортировать необходимые библиотеки и стили

import React from 'react';
import { useTable, useSortBy, usePagination, useFilters } from 'react-table';
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const TableComponent = ({ data }) => {
  // Создайте колонки с необходимыми данными
  const columns = React.useMemo(
    () => [
      {
        Header: 'Услуга',
        accessor: 'service',
        Filter: DefaultColumnFilter, // Добавьте фильтр для колонки
      },
      {
        Header: 'Количество заказов',
        accessor: 'orderCount',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Средний чек',
        accessor: 'averageCheck',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Доля от общего дохода',
        accessor: 'revenuePercentage',
        Filter: DefaultColumnFilter,
      },
    ],
    []
  );

  // Используйте хуки react-table для создания таблицы с сортировкой, фильтрацией и пагинацией
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    gotoPage,
    pageOptions,
    
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 4 }, // Начальное состояние для пагинации
    },
    useFilters, // Используйте хук фильтрации
    useSortBy, // Используйте хук сортировки
    usePagination // Используйте хук пагинации
  );

  const { pageIndex } = state;

  return (
    <div className='overflow-x-scroll'>

      <div className='overflow-x-scroll'>
      <table {...getTableProps()} className="w-full border rounded-lg overflow-hidden transition-height">
        <thead className="bg-main text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className=''>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-left"
                >
                  {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <IoMdArrowDropup />
                        : <IoMdArrowDropdown />
                      : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border px-4 py-2 text-purple-900">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <div className="mt-4 flex justify-center items-center">
        <div className="flex items-center">
          <button
            onClick={() => pageIndex > 0 && gotoPage(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="px-3 py-1 bg-main text-white mr-2 rounded-lg"
          >
            Предыдущая
          </button>
          <span className="text-purple-500">
            Страница{' '}
            <strong>
              {pageIndex + 1} из {pageOptions.length}
            </strong>
          </span>
          <button
            onClick={() => pageIndex < pageOptions.length - 1 && gotoPage(pageIndex + 1)}
            disabled={pageIndex === pageOptions.length - 1}
            className="px-3 py-1 bg-main text-white ml-2 rounded-lg"
          >
            Следующая
          </button>
        </div>
      </div>
    </div>
  );
};

// Функция-компонент для фильтрации по умолчанию
const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Фильтр"
      className="border border-purple-500 px-2 py-1"
    />
  );
};

export default TableComponent;
