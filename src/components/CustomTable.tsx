"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  HeaderGroup,
  Header,
  CellContext,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Column {
  key: string;
  label: string;
}

interface CustomTableProps<T extends object = Record<string, unknown>> {
  columns: Column[];
  data: T[];
}

const CustomTable = <T extends object = Record<string, unknown>>({
  columns,
  data,
}: CustomTableProps<T>) => {
  // 1. Create column definitions for TanStack
  const columnDefs = React.useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((col) => ({
        accessorKey: col.key,
        header: col.label,
        cell: (info: CellContext<T, unknown>) => info.getValue(),
      })),
    [columns]
  );

  // 2. Create the table instance
  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-white shadow rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<T, unknown>) => (
                  <th
                    key={header.id}
                    className="px-3 py-3 sm:px-4 font-semibold uppercase tracking-wider text-gray-600 text-xs sm:text-sm"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400 text-sm"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col xs:flex-row items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3 border-t bg-gray-50 text-sm">
        <span className="text-gray-600 text-xs sm:text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex flex-wrap justify-center xs:justify-end items-center gap-1 mt-2 xs:mt-0">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm text-blue-600 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            |&lt;
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm text-blue-600 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          <div className="hidden sm:flex">
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => table.setPageIndex(page)}
                  className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm rounded ${
                    page === table.getState().pagination.pageIndex
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {page + 1}
                </button>
              )
            )}
          </div>

          <span className="sm:hidden px-2 py-1 text-xs">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm text-blue-600 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm text-blue-600 rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;|
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
