import { Counters } from "./Counters";

export const CountersSchema = {
    embedded: true,
    target: Counters,
    columns: {
        likes: {
            type: Number
        },
        comments: {
            type: Number
        },
        favorites: {
            type: Number
        }
    },
    indices: {
        IDX_TEST: {
            unique: false,
            columns: [
                "likes",
                "comments"
            ]
        }
    }
};
