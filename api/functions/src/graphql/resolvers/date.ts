import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Timestamp } from '../../firebase';

export const DateResolver = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return Timestamp.fromMillis(value); // value from the client
  },
  serialize(value) {
    return value.toMillis(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});
