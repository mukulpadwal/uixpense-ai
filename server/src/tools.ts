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

  return [addExpense];
};

export default initTools;
