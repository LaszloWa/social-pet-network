import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const writeClient = sanityClient({
    projectId: 't8r70fo7',
    dataset: 'production',
    token: process.env.REACT_APP_SANITY_WRITE_TOKEN,
});

const clientConfig = sanityClient({
    projectId: 't8r70fo7',
    dataset: 'production',
})

export const readClient = clientConfig;

export const builder = imageUrlBuilder(clientConfig);
