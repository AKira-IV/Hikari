import { ReactNode } from "react";
import clsx from "clsx";

interface TableProps {
  className?: string;
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

interface TableHeadProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  onSort?: () => void;
}

export function Table({ className, children }: TableProps) {
  return (
    <div className="table-container">
      <table className={clsx("table-base", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return <thead className={clsx("table-header", className)}>{children}</thead>;
}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={clsx("table-body", className)}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={clsx("table-row", onClick && "table-row-clickable", className)}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className, align = "left", sortable, onSort }: TableHeadProps) {
  return (
    <th
      className={clsx("table-head", `table-align-${align}`, sortable && "table-head-sortable", className)}
      onClick={sortable ? onSort : undefined}
    >
      <div className="table-head-content">
        {children}
        {sortable && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="table-sort-icon">
            <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
          </svg>
        )}
      </div>
    </th>
  );
}

export function TableCell({ children, className, align = "left" }: TableCellProps) {
  return (
    <td className={clsx("table-cell", `table-align-${align}`, className)}>
      {children}
    </td>
  );
}
