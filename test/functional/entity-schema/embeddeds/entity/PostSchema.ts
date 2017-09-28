import { Post } from "./Post";
import { Counters } from "./Counters";
import { CountersSchema } from "./CountersSchema";

export const PostSchema = {
  target: Post,
  columns: {
    id: {
        primary: true,
        type: Number,
        generated: "increment"
    },
    title: {
        type: String
    },
    text: {
        type: String
    }
  },
  embeddeds: {
    counters: {
        type: () => Counters,
        schema: CountersSchema,
        prefix: "counters_"
    }
  }
};
