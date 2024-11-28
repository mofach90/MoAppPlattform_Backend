import { PredictionServiceClient } from '@google-cloud/aiplatform';

export const generateImage = async (prompt: string): Promise<Buffer | null> => {
  const projectId = 'cpl-mo';
  const location = 'us-central1';

  const clientOptions = {
    apiEndpoint: `${location}-aiplatform.googleapis.com`,
  };
  const predictionServiceClient = new PredictionServiceClient(clientOptions);

  const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagegeneration@002`;

  const instances = [
    {
      structValue: {
        fields: {
          prompt: { stringValue: prompt },
        },
      },
    },
  ];

  const parameters = {
    structValue: {
      fields: {
        sampleCount: { numberValue: 1 },
        aspectRatio: { stringValue: '1:1' },
        safetyFilterLevel: { stringValue: 'block_some' },
        personGeneration: { stringValue: 'allow_adult' },
      },
    },
  };

  const request = { endpoint, instances, parameters };
  const [response] = await predictionServiceClient.predict(request);
  const predictions = response.predictions;

  if (!predictions?.length) {
    console.log('No image was generated. Check the request parameters and prompt.');
    return null;
  }

  const prediction = predictions[0];
  return Buffer.from(
    (prediction as any).structValue.fields.bytesBase64Encoded.stringValue,
    'base64'
  );
};
