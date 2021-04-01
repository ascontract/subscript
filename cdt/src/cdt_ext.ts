import * as fs from "fs";
import * as path from "path";
import * as blake from "blakejs";
import {
  utils,
  TransformVisitor,
  PathTransformVisitor,
  DecoratorVisitor,
  SimpleParser
} from "visitor-as";
import {
  Node,
  Expression,
  Parser,
  CallExpression,
  IdentifierExpression,
  DecoratorNode,
  FunctionDeclaration
} from "visitor-as/as";


type ABIType = {
  displayName: string[],
  type: number
}

type ABIParameter = {
  name: string,
  type: ABIType
}

type ABIMessage = {
  payable: boolean,
  returnType: ABIType,
  args: ABIParameter[],
  selector: string,
  mutates: boolean,
  name: string[]
}

enum TypeStruct {
  Primitive,
  Composite,
  Array
}

interface TypeDef {
  structure: TypeStruct,
  path: string[]
}

let messages: ABIMessage[] = [];
let registery: TypeDef[] = [];

export class ContractExtension extends PathTransformVisitor {

  visitFunctionDeclaration(node: FunctionDeclaration): void {
    if (utils.hasDecorator(node, "as_view")) {
      const name = utils.toString(node.name);
      const sig = utils.toString(node.signature);
      const selector = blake.blake2bHex(name, null, 32).substring(0, 8);
      const returnType = utils.toString(node.signature.returnType);
      const args: ABIParameter[] = [];

      this.stdout.write("fn " + name + " signature" + sig + " selector: " + selector + "return: " +  returnType + "\n");

      for (let i = 0; i < node.signature.parameters.length; i++) {
        this.stdout.write(name + " params: " + utils.toString(node.signature.parameters[i].name) + ": " + utils.toString(node.signature.parameters[i].type) + "\n");
        args.push({
          name: utils.toString(node.signature.parameters[i].name),
          type: {
            displayName: [utils.toString(node.signature.parameters[i].type)],
            type: 0
          }
        })
      }

      messages.push({
        name: [name],
        args: args,
        selector: "0x" + selector,
        mutates: false,
        returnType: {displayName: [utils.toString(node.signature.returnType)], type: 0},
      });

    }
  }

  afterParse(pars: Parser): void {
    let sources = pars.sources.filter(utils.not(utils.isLibrary));
    this.visit(sources);
    ensureDirExists("./build");
    this.writeFile("abi.json", this.buildABI(), path.join(this.baseDir, "build"));
  }

  buildABI(): string {
    let detail = {
      name: "ascontract",
      version: "0.1.0"
    }
    let meta = {
      contract: detail,
      spec: {
        docs: [],
        events: [],
        constructors: [],
        messages: messages,
      },
    }
    return JSON.stringify(meta, null, 2);
  }
}

function ensureDirExists(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirExists(dirname);
  fs.mkdirSync(dirname);
}

export = ContractExtension;