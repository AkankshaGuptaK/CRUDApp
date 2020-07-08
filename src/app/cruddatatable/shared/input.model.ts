export class InputOption{    
    BaseAPIUrl: string;
    Get?: string;
    edit?: string;
    add?: string;
    delete?: string;
    dataTableOptions: {
        Columns: Column[];
    };
    events:{
        edited: Function,
        added: Function,
        deleted: Function,
    };
}

export class Column{
    name?: string;
    data?: string;
    format?: string;
}