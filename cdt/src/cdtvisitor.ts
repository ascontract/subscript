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
  name: string,
  typeId: number
}

type ABIParameter = {
  name: string,
  type: ABIType
}

type ABIMessage = {
  payable: boolean,
  returnType: ABIParameter,
  args: ABIParameter[]
}

export class ContractExtension extends PathTransformVisitor {

  visitFunctionDeclaration(node: FunctionDeclaration): void {
    if (utils.hasDecorator(node, "list")) {
      const name = utils.toString(node.name);
      const sig = utils.toString(node.signature);
      this.stdout.write("fn=" + name + ", signature: " + sig + "\n");

      const selector = blake.blake2b("abc", null, 32).subarray(0, 4);
      this.stdout.write("fn " + name + " selector: " + selector + "\n");

      for (let i = 0; i < node.signature.parameters.length; i++) {
        this.stdout.write("params: " + utils.toString(node.signature.parameters[i].name) + ": " + utils.toString(node.signature.parameters[i].type) + "\n");
      }
      this.stdout.write("return: " + utils.toString(node.signature.returnType) + "\n");
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
      spec: {},
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