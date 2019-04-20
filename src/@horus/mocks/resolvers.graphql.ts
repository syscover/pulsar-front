export default {
    Object: {
        __parseValue(value) {
            return JSON.parse(value);
        },
        __serialize(value) {
            return JSON.stringify(value);
        },
        __parseLiteral(ast) {
            return ast;
        }
    }
};
