import sanityClient from "@sanity/client";
import imageUrlBuilder from  "@sanity/image-url";

const client = sanityClient({
    projectId: "e02ounqv",
    dataset:"production",
    useCdn: true,
    apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);
export const urlFor =(source)  => builder.image(source)

//RUN This to add exception for localhost 3000 CORS policy
//sanity cors add http://localhost:19006

export default client;