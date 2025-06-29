import { Construct } from "constructs";

class Bucket {}

export class MyConstruct extends Construct {
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
