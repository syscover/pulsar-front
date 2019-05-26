export default `
    scalar Date

    interface CorePagination {
        total: Int!
        filtered: Int
    }
     
    input CoreSQLInput {
        command: String!
        operator: String
        value: String
        column: String
    }
`;
