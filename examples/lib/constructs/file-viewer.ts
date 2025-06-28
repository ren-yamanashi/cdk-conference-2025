import { Duration, RemovalPolicy } from "aws-cdk-lib";
import type { Certificate, ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  AllowedMethods,
  CacheHeaderBehavior,
  CachePolicy,
  CachedMethods,
  Distribution,
  type IKeyGroup,
  PriceClass,
  ResponseHeadersPolicy,
  SecurityPolicyProtocol,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";

import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { type IHostedZone } from "aws-cdk-lib/aws-route53";
import { Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface FileViewerProps {
  readonly accessControlAllowOrigins: string[];
  readonly certificate: ICertificate;
  readonly domainName: string;
  readonly hostedZone: IHostedZone;
  readonly keyGroup: IKeyGroup;
  readonly athenaDatabaseName: string;
}

export class FileViewer extends Construct {
  public readonly bucket: IBucket;

  constructor(scope: Construct, id: string, props: FileViewerProps) {
    super(scope, id);

    this.bucket = new Bucket(this, "OriginBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const distribution = new Distribution(this, "Distribution", {
      certificate: props.certificate,
      domainNames: [props.domainName],
      enableLogging: true,
      minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
      priceClass: PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: CachedMethods.CACHE_GET_HEAD,
        compress: false,
        origin: S3BucketOrigin.withOriginAccessControl(this.bucket),
        trustedKeyGroups: [props.keyGroup],
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new CachePolicy(this, "CachePolicy", {
          defaultTtl: Duration.minutes(1), // defaultTtlを1分で指定している理由: docs/adr/0001_CloudFrontキャッシュ戦略.md
          headerBehavior: CacheHeaderBehavior.allowList(
            "Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods"
          ),
        }),
        responseHeadersPolicy: new ResponseHeadersPolicy(
          this,
          "ResponseHeadersPolicy",
          {
            corsBehavior: {
              accessControlAllowCredentials: false,
              accessControlAllowHeaders: ["*"],
              accessControlAllowMethods: ["GET"],
              accessControlAllowOrigins: props.accessControlAllowOrigins,
              originOverride: true,
            },
          }
        ),
      },
    });
  }
}

interface Args {
  certificate: Certificate;
  domainName: string;
}

export class MyConstruct extends Construct {
  constructor(scope: Construct, myConstructId: string, args: Args) {
    super(scope, myConstructId);

    new Distribution(this, Distribution.name, {
      certificate: args.certificate,
      domainNames: [args.domainName],
      // ...
    });
  }
}