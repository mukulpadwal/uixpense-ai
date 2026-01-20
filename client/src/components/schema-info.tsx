import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Table as TableIcon, Info, Key } from "lucide-react";
import { DATABASE_SCHEMA, type ColumnSchema } from "@/lib/schema-data";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function SchemaInfo() {
  const schema = DATABASE_SCHEMA[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="cursor-pointer">
          <Database size={16} className="group-hover:animate-pulse" />
          <span className="hidden sm:block">Schema</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 text-orange-500">
            <Database size={20} />
            <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight">
              Database Architecture
            </DialogTitle>
          </div>
          <DialogDescription className="text-stone-400">
            Current backend structure for the{" "}
            <span className="text-orange-300 font-mono">uiXpense</span> system.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="overview"
          className="w-full max-h-[50vh] overflow-y-auto px-2"
        >
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sql">SQL</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="w-full space-y-6">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-stone-500 uppercase tracking-widest">
                Active Table
              </h4>
              <div className="flex items-center gap-2 text-lg font-semibold text-stone-100">
                <TableIcon size={18} className="text-orange-500" />
                {schema.name}
              </div>
              <p className="text-sm text-stone-400 italic">
                {schema.description}
              </p>
            </div>

            <div className="w-full border border-stone-800 rounded-xl overflow-x-auto bg-stone-900/20">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-stone-900/50 border-b border-stone-800 text-stone-400">
                    <th className="px-4 py-3 font-medium">Column</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-1 py-3 font-medium text-center">PK</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/50">
                  {schema.columns.map((column: ColumnSchema) => (
                    <tr
                      key={column.name}
                      className="hover:bg-orange-500/5 transition-colors group"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-stone-100 group-hover:text-orange-400 transition-colors">
                            {column.name}
                          </span>
                          {!column.notNull && !column.isPrimary && (
                            <span className="text-[10px] text-stone-600 uppercase tracking-tighter">
                              null
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={cn(
                            "font-mono uppercase text-[10px]",
                            column.type.includes("INT")
                              ? "bg-blue-500/10 text-blue-400 ring-blue-500/20"
                              : column.type.includes("REAL")
                                ? "bg-green-500/10 text-green-400 ring-green-500/20"
                                : "bg-purple-500/10 text-purple-400 ring-purple-500/20",
                          )}
                        >
                          {column.type}
                        </Badge>
                      </td>
                      <td className="px-1 py-3 text-center">
                        {column.isPrimary && (
                          <Key
                            size={14}
                            className="inline text-orange-500 animate-pulse"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 text-stone-500 text-xs leading-relaxed group-hover:text-stone-400 transition-colors">
                        {column.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg text-blue-400/80 text-xs">
              <Info size={14} />
              <span>
                The system uses SQLite for lightweight, persistent data storage.
              </span>
            </div>
          </TabsContent>
          <TabsContent value="sql">
            <div className="relative bg-stone-900 rounded-xl overflow-hidden border border-stone-800">
              <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800 bg-stone-950/50">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                  SQL Definition
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700"></div>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono text-stone-300 overflow-x-auto leading-relaxed">
                <code className="block">
                  {schema.sql.split("\n").map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pr-4 text-stone-600 select-none text-right w-6 italic">
                        {i + 1}
                      </span>
                      <span className="table-cell">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default SchemaInfo;
