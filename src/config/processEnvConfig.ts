const filename = process.env.FILE;
filename?.toString();

export default {
    port: process.env.PORT,
    file: filename,
}