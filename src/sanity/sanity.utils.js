import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: 't8r70fo7',
    dataset: 'production',
    token: process.env.REACT_APP_SANITY_WRITE_TOKEN,
});

export default client;