import sdk from 'node-appwrite';

export const client = new sdk.Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66bd1e590003e606f0d9')
  .setKey(
    '1d2674b0f21b490cd9a67d90d32915290a4c2c3b9e282e967d6cf795d47d769116b508aaa51eca0857d1362c422b48f5dddf2ba5850c7b4bf49155aed9443c9836d6ffedd43e1810065c11d4b1837a569da6d925ecf07572e14cc35d9a974ff3964452bf832d759f8e12be6c17ac28d0b711412abd2b220d11cdc1bf1801d740',
  );
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
