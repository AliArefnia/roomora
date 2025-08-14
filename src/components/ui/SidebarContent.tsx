import { Task } from "@/types/types";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GripVertical } from "lucide-react";

function SidebarContent({ tasks }: { tasks: Task[] }) {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <div>
      <button onClick={() => setSelectedTab("tasks")}>tasks</button>
      <button onClick={() => setSelectedTab("asd")}>aasd</button>
      <button>asdas</button>
      {selectedTab === "tasks" && (
        <section className="flex-1">
          <ScrollArea className="h-full p-4 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Task Checklist
            </h3>
            <ul className="space-y-2">
              {tasks.length === 0 ? (
                <li className="text-center text-sm text-muted-foreground py-4">
                  No tasks available
                </li>
              ) : (
                tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center p-2 rounded-md bg-sidebar-accent/5 hover:bg-sidebar-accent/10 border border-sidebar-border"
                  >
                    <GripVertical className="h-4 w-4 mr-2 text-sidebar-foreground/50" />
                    <span className="text-sm text-sidebar-foreground">
                      {task.description}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </ScrollArea>
        </section>
      )}
      {selectedTab === "asd" && <p>asdasd</p>}
    </div>
  );
}

export default SidebarContent;
