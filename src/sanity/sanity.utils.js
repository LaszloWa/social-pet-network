import sanityClient from '@sanity/client';

export const writeClient = sanityClient({
    projectId: 't8r70fo7',
    dataset: 'production',
    token: process.env.REACT_APP_SANITY_WRITE_TOKEN,
});

export const readClient = sanityClient({
    projectId: 't8r70fo7',
    dataset: 'production',
});