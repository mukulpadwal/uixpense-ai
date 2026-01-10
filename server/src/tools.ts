import { DatabaseSync } from "node:sqlite";
import * as z from "zod";
import { tool } from "langchain";

const initTools = (database: DatabaseSync) => {
  const addExpense = tool(
    ({ title, amount, category, description }) => {
      const date = new Date().toISOString().split("T")[0];

      try {
        const statement = database.prepare(`
          INSERT INTO expenses (title, amount, category, description, date) VALUES (?, ?, ?, ?, ?);
        `);

        statement.run(title, amount, category, description, date);

        return JSON.stringify({
          success: true,
          message: "Expense added successfully",
        });
      } catch (error) {
        return JSON.stringify({
          success: false,
          message: "Failed to add expense",
        });
      }
    },
    {
      name: "add_expense",
      description: "Tool to add an expense to the database.",
      schema: z.object({
        title: z.string().describe("Title of the expense"),
        amount: z.number().describe("Amount of the expense"),
        category: z.string().describe("Category of the expense"),
        description: z.string().describe("Description of the expense"),
      }),
    },
  );

  const getExpenses = tool(
    ({ from, to }) => {
      try {
        const statement = database.prepare(`
          SELECT * FROM expenses WHERE date BETWEEN ? AND ?;
        `);

        const expenses = statement.all(from, to);

        return JSON.stringify({
          success: true,
          expenses,
        });
      } catch (error) {
        return JSON.stringify({
          success: false,
          message: "Failed to get expenses",
        });
      }
    },
    {
      name: "get_expenses",
      description:
        "Tool to get all expenses from the database for a given date range.",
      schema: z.object({
        from: z.string().describe("From date in YYYY-MM-DD format"),
        to: z.string().describe("To date in YYYY-MM-DD format"),
      }),
    },
  );

  const generateExpenseChart = tool(
    ({ from, to, groupBy }) => {
      const formatMap = {
        day: "%Y-%m-%d",
        week: "%Y-%W",
        month: "%Y-%m",
        year: "%Y",
      };

      try {
        const format = formatMap[groupBy];

        const statement = database.prepare(`
          SELECT strftime('${format}', date) as period, SUM(amount) as total
          FROM expenses
          WHERE date BETWEEN ? AND ?
          GROUP BY period
          ORDER BY period;  
        `);

        const rows = statement.all(from, to);

        return JSON.stringify({
          success: true,
          rows,
        });
      } catch (error) {
        return JSON.stringify({
          success: false,
          message: "Failed to generate expense chart",
        });
      }
    },
    {
      name: "generate_expense_chart",
      description:
        "Tool to generate an expense chart for a given date range grouped by day, week, month or year.",
      schema: z.object({
        from: z.string().describe("From date in YYYY-MM-DD format"),
        to: z.string().describe("To date in YYYY-MM-DD format"),
        groupBy: z
          .enum(["day", "week", "month", "year"])
          .describe("Group by day, week, month or year"),
      }),
    },
  );

  return [addExpense, getExpenses, generateExpenseChart];
};

export default initTools;
