import { Provider } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';

export const MEILISEARCH_CLIENT = 'MEILISEARCH_CLIENT';

export const MeilisearchProvider: Provider = {
  provide: MEILISEARCH_CLIENT,
  useFactory: () => {
    // Use Docker service name when running in container, otherwise localhost
    const isDocker =
      process.env.NODE_ENV === 'production' ||
      process.env.DOCKERIZED === 'true';
    const defaultHost = isDocker
      ? 'http://meilisearch:7700'
      : 'http://localhost:7700';
    const host = process.env.MEILISEARCH_HOST || defaultHost;
    const apiKey = process.env.MEILISEARCH_API_KEY || 'masterKey123';

    return new MeiliSearch({
      host,
      apiKey,
    });
  },
  inject: [],
};
