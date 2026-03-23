import { ColumnType, DataTableColumn } from '@onecx/angular-accelerator';

export const documentSearchColumns: DataTableColumn[] = [
  {
    columnType: ColumnType.STRING,
    id: 'changeMe',
    nameKey: 'DOCUMENT_SEARCH.RESULTS.CHANGE_ME',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
      'DOCUMENT_SEARCH.PREDEFINED_GROUP.DEFAULT',
      'DOCUMENT_SEARCH.PREDEFINED_GROUP.EXTENDED',
      'DOCUMENT_SEARCH.PREDEFINED_GROUP.FULL',
    ],
  },
];
// ACTION S6: Define search results columns: https://onecx.github.io/docs/documentation/current/onecx-nx-plugins:generator/search/search-results.html#action-6
