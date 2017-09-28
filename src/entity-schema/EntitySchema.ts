import {EntitySchemaTable} from "./EntitySchemaTable";
import {EntitySchemaIndex} from "./EntitySchemaIndex";
import {EntitySchemaColumn} from "./EntitySchemaColumn";
import {EntitySchemaEmbedded} from "./EntitySchemaEmbedded";
import {EntitySchemaRelation} from "./EntitySchemaRelation";

/**
 * Interface for entity metadata mappings stored inside "schemas" instead of models decorated by decorators.
 */
export interface EntitySchema { // todo: make it-to-date
    /**
     * Defines whether this schema describes an embedded entity or not
     */
    embedded?: boolean;

    /**
     * Name of the schema it extends.
     */
    extends?: string;

    /**
     * Target bind to this entity schema. Optional.
     */
    target?: Function;

    /**
     * Entity name.
     */
    name: string;

    /**
     * Entity table's options.
     */
    table?: EntitySchemaTable | false;

    /**
     * Entity column's options.
     */
    columns: {
        [columnName: string]: EntitySchemaColumn
    };

    /**
     * Embedded options
     */
    embeddeds: {
        [columnName: string]: EntitySchemaEmbedded
    };

    /**
     * Entity relation's options.
     */
    relations?: {
        [relationName: string]: EntitySchemaRelation;
    };

    /**
    * Entity indices options.
    */
    indices?: {
        [indexName: string]: EntitySchemaIndex;
    };

}
