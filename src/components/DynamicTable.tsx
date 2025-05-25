"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DynamicTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  selectedIds?: number[]; // Changed from string[] to number[]
  setSelectedIds?: (ids: number[]) => void;
  getRowId: (row: T) => number;
}

function DynamicTable<T>({
  columns,
  data,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  selectedIds = [],
  setSelectedIds,
  getRowId,
}: DynamicTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(getRowId(row)), // TanStack expects string IDs internally
  });

  const pageRowIds = table
    ?.getRowModel()
    ?.rows.map((row) => getRowId(row.original));

  // Selection helpers
  const toggleAll = () => {
    if (!setSelectedIds) return;
    const allSelected = pageRowIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(selectedIds.filter((id) => !pageRowIds.includes(id)));
    } else {
      setSelectedIds(Array.from(new Set([...selectedIds, ...pageRowIds])));
    }
  };

  const toggleOne = (id: number) => {
    if (!setSelectedIds) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const allSelected =
    pageRowIds.length > 0 && pageRowIds.every((id) => selectedIds.includes(id));
  const someSelected =
    pageRowIds.some((id) => selectedIds.includes(id)) && !allSelected;

  return (
    <div className="overflow-x-auto w-full rounded border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
              {setSelectedIds && (
                <th className="w-12 px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                    className="cursor-pointer"
                  />
                </th>
              )}
              {headerGroup.headers.map((header, index) => (
                <th
                  key={index}
                  colSpan={header.colSpan}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider select-none"
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (setSelectedIds ? 1 : 0)}
                className="text-center p-4 text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}
          {table.getRowModel().rows.map((row, index) => {
            const rowId = getRowId(row.original);
            const isSelected = selectedIds.includes(rowId);
            return (
              <tr key={index} className={isSelected ? "bg-blue-50" : undefined}>
                {setSelectedIds && (
                  <td className="w-12 px-3 py-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(rowId)}
                      aria-label={`Select row ${rowId}`}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={index}
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-200"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center gap-1 px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-200"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default DynamicTable;
