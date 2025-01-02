"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "../services";

/* -------------------------------------------------------------------------- */
/*                           TanStack Table Imports                           */
/* -------------------------------------------------------------------------- */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

/* -------------------------------------------------------------------------- */
/*                                Icons Import                                */
/* -------------------------------------------------------------------------- */
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useDebounce } from "../customHooks/useDebounce";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const columnHelper = createColumnHelper();

/*
 ? Why to give key to query
 React query caches the data by default and every cache need unique key.

 ? getHeaderGroups() is used to get table headers
 ? getRowModel() is used to get table data
*/

// Columns of the table
const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => <p>Id</p>,

    enableColumnFilter: false,
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <p>Name</p>,
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: () => <p>Email</p>,
  }),
  columnHelper.accessor("phone", {
    cell: (info) => info.getValue(),
    header: () => <p>Phone</p>,

    enableColumnFilter: false,
  }),
  columnHelper.accessor("website", {
    cell: (info) => info.getValue(),
    header: () => <p>Website</p>,

    enableColumnFilter: false,
  }),

  columnHelper.accessor("company", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: any) => info.getValue().name,
    header: () => <p>Company</p>,

    enableColumnFilter: false,
  }),
];

const Users = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersData,
  });

  // toast to show message
  const { toast } = useToast();

  const [sorting, setSorting] = useState([]); // Sorting of the table.
  const [globalFilter, setGlobalFilter] = useState(""); // For searching globally
  const [searchValue, setSearchValue] = useState(""); // Search value
  const usersData = data?.length > 0 ? data : [];

  // Debounced search value
  const searchQuery = useDebounce(searchValue, 700);

  //   Creating table
  const table = useReactTable({
    data: usersData,
    columns: columns as [],
    getCoreRowModel: getCoreRowModel(), // Allows us to access rows in tbody

    // For sorting, filters and pagination of the table
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },

    onSortingChange: setSorting as () => void,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Applying debouncing on search functionality
  useEffect(() => {
    setGlobalFilter(searchQuery.debouncedValue);
  }, [searchQuery]);

  if (error) {
    return (
      <p className="text-center text-2xl text-red-500">
        Something went wrong, please try again later
      </p>
    );
  }
  return (
    <>
      {isLoading ? (
        <p className="text-center text-2xl text-gray-500">Loading...</p>
      ) : (
        <div>
          <div className="my-4 relative flex justify-between items-center">
            <input
              value={searchValue ?? ""}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className=" w-[20rem] px-4 py-2 border border-gray300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />

            <Button
              onClick={() => {
                toast({
                  variant: "destructive",
                  title: "Feature not available",
                  description:
                    "The 'Add User' feature is coming soon. Stay tuned!",
                  action: <ToastAction altText="Close">Close</ToastAction>,
                });
              }}
            >
              Add User
            </Button>
          </div>

          {/* Table */}
          <div className="w-full shadow-sm">
            <table className="w-full divide-gray-50">
              <thead className="bg-gray-50">
                {/* Returns an array of groups */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {/* Mapping through an array of header columns */}
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center"
                              : ""
                          }
                        >
                          {/* Rendering the columns */}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {/* Column based filter */}
                          {header.column.getCanFilter() ? (
                            <div>
                              <input
                                className="ml-1 p-1"
                                placeholder="Search"
                                type="text"
                                value={
                                  (header.column.getFilterValue() ||
                                    "") as string
                                }
                                onChange={(e) => {
                                  header.column.setFilterValue(e.target.value);
                                  e.stopPropagation();
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          <ArrowUpDown className="ml-2" size={14} />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {/* Body of the table */}
              <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <span className="mr-2">Items per page</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                >
                  {[5, 10, 20, 30].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-60 cursor-pointer"
                >
                  <ChevronsLeft size={20} />
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-60 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="flex items-center">
                  <input
                    min={1}
                    max={table.getPageCount()}
                    type="number"
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="w-16 p-2 rounded-md border border-gray-300 text-center"
                  />
                  <span className="ml-1"> of {table.getPageCount()}</span>
                </span>

                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ChevronsRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
