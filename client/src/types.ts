export type StreamMessage =
  | {
      id: string;
      type: "user";
      payload: {
        text: string;
      };
    }
  | {
      id: string;
      type: "ai";
      payload: {
        text: string;
      };
    }
  | {
      id: string;
      type: "toolCall:start";
      payload: {
        name: string;
        args: Record<string, unknown>;
      };
    }
  | {
      id: string;
      type: "tool";
      payload: {
        name: string;
        result: Record<string, unknown>;
      };
    };
