import { environment } from '../../environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'ps3M2J7SoD86nFvHvtuFoNUqUPoK0IX1',
  domain: 'swiftlabs.auth0.com',
  callbackURL: environment.callbackUrl,
  apiUrl: '',
};
