export interface ColumnSchema {
  name: string;
  type: string;
  isPrimary?: boolean;
  notNull?: boolean;
  defaultValue?: string;
  description: string;
}

export interface TableSchema {
  name: string;
  description: string;
  columns: ColumnSchema[];
  sql: string;
}

export const DATABASE_SCHEMA: TableSchema[] = [
  {
    name: "expenses",
    description:
      "Stores all expense records including amount, category, and date.",
    sql: `CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL
);`,
    columns: [
      {
        name: "id",
        type: "INTEGER",
        isPrimary: true,
        description: "Unique identifier for each expense record.",
      },
      {
        name: "amount",
        type: "REAL",
        notNull: true,
        description: "the numerical value of the expense.",
      },
      {
        name: "category",
        type: "TEXT",
        notNull: true,
        description: "The category/type of expense (e.g., Food, Travel).",
      },
      {
        name: "description",
        type: "TEXT",
        description: "Optional notes or details about the expense.",
      },
      {
        name: "date",
        type: "TEXT",
        notNull: true,
        description: "The date of the expense (YYYY-MM-DD).",
      },
    ],
  },
];
