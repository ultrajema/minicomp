const {
  tokenizer,
  parser,
  transformer,
  codeGenerator,
  compiler,
} = require('./the-super-tiny-compiler');
const assert = require('assert');

const input  = '(add 2 (subtract 4 2))';
const output = 'add(2, subtract(4, 2));';

const tokens = [
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'add'      },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: '('        },
  { type: 'name',   value: 'subtract' },
  { type: 'number', value: '4'        },
  { type: 'number', value: '2'        },
  { type: 'paren',  value: ')'        },
  { type: 'paren',  value: ')'        }
];

const ast = {
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [{
      type: 'NumberLiteral',
      value: '2'
    }, {
      type: 'CallExpression',
      name: 'subtract',
      params: [{
        type: 'NumberLiteral',
        value: '4'
      }, {
        type: 'NumberLiteral',
        value: '2'
      }]
    }]
  }]
};

const newAst = {
  type: 'Program',
  body: [{
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'add'
      },
      arguments: [{
        type: 'NumberLiteral',
        value: '2'
      }, {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'subtract'
        },
        arguments: [{
          type: 'NumberLiteral',
          value: '4'
        }, {
          type: 'NumberLiteral',
          value: '2'
        }]
      }]
    }
  }]
};

assert.deepStrictEqual(tokenizer(input), tokens, 'Tokenizer deberia transformar `input` string into `tokens` array');
assert.deepStrictEqual(parser(tokens), ast, 'Parser deberia transformar `tokens` array into `ast`');
assert.deepStrictEqual(transformer(ast), newAst, 'Transformer deberia transformar  `ast`  a `newAst`');
assert.deepStrictEqual(codeGenerator(newAst), output, 'Generador de codigo deberia transfromar `newAst` a`output` string');
assert.deepStrictEqual(compiler(input), output, 'compilador deberia transformar "input "a "output');
'compilador deberia transformar "input "a "output'
console.log('All Passed!');
