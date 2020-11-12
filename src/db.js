import dynamoose from 'dynamoose';

dynamoose.aws.sdk.config.update({
  "accessKeyId": "AKIAITVWTTUMUS74RS6A",
  "secretAccessKey": "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",
  "region": "us-east-1"
});

export default dynamoose;

