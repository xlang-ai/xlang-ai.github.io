export const publicFilePath = (path: string) => {
  // For deployment to github pages
  if (process.env.NODE_ENV === "production") {
    return `${path}`;
  } else {
    return path;
  }
};