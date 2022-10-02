import aws from 'aws-sdk';

export interface IImage {
  url: string;
  name: string;
}

const config = {
  apiVersion: 'latest',
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,  
  region: "us-east-2"
};

export const baseParams = {
  Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
}

aws.config.update(config);

export const s3 = new aws.S3({
  params: baseParams
});

export const getAllImages = async () => {
  const images = await new Promise((resolve, reject) => {
    s3.listObjects((err, data) => {
      if (err) reject(err);
      resolve(data.Contents);
    })
  })
  .then((data: any) => data.map(({ Key }: any) => formatAWSImage(Key)))
  .catch((err) => console.log(err));

  return images;
};

export const deleteImage = (key: string) => new Promise((resolve, reject) => {
  const params = {
    ...baseParams,
    Key: key
  };

  // @ts-ignore
  s3.deleteObject(params, (err, data) => {
    if (err) reject(err);
    resolve(data);
  })
}); 

export const formatAWSImage = (key: string): IImage => {
  const baseUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`;
  return {
    url: baseUrl + key,
    name: key
  }
};