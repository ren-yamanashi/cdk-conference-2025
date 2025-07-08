import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class MyConstruct extends Construct {
  public readonly bucket: IBucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.bucket = new Bucket(this, "MyBucket");
  }
}