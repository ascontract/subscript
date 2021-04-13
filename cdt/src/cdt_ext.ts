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

enum TypeKind {
  Primitive,
  Composite,
  Array
}

class TypeDef {
  constructor(
    public structure: TypeKind,
    public typeId: string,
    public fields: number[],
    public length: number = 0,
    public path: string[] = []
  ){}

  toJSON(): any {
    if (this.structure == TypeKind.Primitive) {
      return {
        def: {
          primitive: this.typeId
        }
      };
    }

    if (this.structure == TypeKind.Array) {
      return {
        def: {
          array: {
            len: this.length,
            type: this.fields[0]
          }
        }
      };
    }

    if (this.structure == TypeKind.Composite) {
      return {
        def: {
          composite: {
            fields: this.fields.map(field => ({ type: field })),
          }
        }
      };
    }
  }
}

class TypeRegistery {
  types: Map<string, number>;

  constructor() {
    this.types = new Map()
  }

  registerType(ty: string): number {
    let id = this.predefineTypes(ty);
    return id;
  }

  getType(identifier: string): number {
    return this.types.get(identifier);
  }

  predefineTypes(name: string): number {
    switch (name) {
      case "bool":
      case "boolean":
        typeTable.push(new TypeDef(TypeKind.Primitive, "bool", []));
        return typeTable.length;
      case "u8":
        typeTable.push(new TypeDef(TypeKind.Primitive, "u8", []));
        return typeTable.length;
      case "u32":
        typeTable.push(new TypeDef(TypeKind.Primitive, "u32", []));
        return typeTable.length;
      case "u64":
        typeTable.push(new TypeDef(TypeKind.Primitive, "u64", []));
        return typeTable.length;
      case "u64":
        typeTable.push(new TypeDef(TypeKind.Primitive, "u64", []));
        return typeTable.length;
      case "i8":
        typeTable.push(new TypeDef(TypeKind.Primitive, "i8", []));
        return typeTable.length;
      case "i32":
        typeTable.push(new TypeDef(TypeKind.Primitive, "i32", []));
        return typeTable.length;
      case "i64":
        typeTable.push(new TypeDef(TypeKind.Primitive, "i64", []));
        return typeTable.length;
      case "AccountId":
        typeTable.push(new TypeDef(TypeKind.Primitive, "u8", []));
        typeTable.push(new TypeDef(TypeKind.Array, "Array<u8>", [typeTable.length], 32));
        typeTable.push(new TypeDef(TypeKind.Composite, "AccountId", [typeTable.length], 0, ["ink_env", "types", "AccountId"]));
        return typeTable.length;
      default:
        return null;
    }
  }
}

let messages: ABIMessage[] = [];
let typeTable: TypeDef[] = [];
let registery = new TypeRegistery();

export class ContractExtension extends PathTransformVisitor {

  visitFunctionDeclaration(node: FunctionDeclaration): void {
    if (utils.hasDecorator(node, "as_view") || utils.hasDecorator(node, "as_external")) {
      const name = utils.toString(node.name);
      const sig = utils.toString(node.signature);
      const selector = blake.blake2bHex(name, null, 32).substring(0, 8);
      const returnType = utils.toString(node.signature.returnType);
      const args: ABIParameter[] = [];

      this.stdout.write("fn " + name + " signature" + sig + " selector: " + selector + "return: " +  returnType + "\n");

      for (let i = 0; i < node.signature.parameters.length; i++) {
        this.stdout.write(name + " params: " + utils.toString(node.signature.parameters[i].name) + ": " + utils.toString(node.signature.parameters[i].type) + "\n");

        const typeId = utils.toString(node.signature.parameters[i].type);
        let typeNum = registery.getType(typeId);
        if (typeNum == null) {
          typeNum = registery.registerType(typeId);
          if (typeNum == null) {
            continue;
          }
        }

        args.push({
          name: utils.toString(node.signature.parameters[i].name),
          type: {
            displayName: [utils.toString(node.signature.parameters[i].type)],
            type: typeNum
          }
        });
      }

      let retId = utils.toString(node.signature.returnType);
      let retNum = registery.getType(retId);
      if (retNum == null) {
          retNum = registery.registerType(retId);
      }

      messages.push({
        name: [name],
        args: args,
        selector: "0x" + selector,
        mutates: utils.hasDecorator(node, "as_external") ? true : false,
        returnType: {displayName: [retId], type: retNum}
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
      types: typeTable
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