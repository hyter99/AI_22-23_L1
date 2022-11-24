export const ChangeUrlSuffix = (newUrlSuffix: string): void => {
  const currUrlElements = window.location.href.split("/");
  // Remove the second and last element from splitted list
  let replacedUrlList = [currUrlElements[0]];
  replacedUrlList = replacedUrlList.concat(currUrlElements.slice(2, currUrlElements.length-1));

  // Add one slash to first element (to be like "https:/")
  replacedUrlList[0] += "/";

  // Add new page's url suffix
  replacedUrlList.push(newUrlSuffix);

  // Join new url items with slash
  const replacedUrl = replacedUrlList.join("/");
  //console.log("replacedUrl", replacedUrl);

  // Establish new url in page bar
  history.pushState({}, "", replacedUrl);
};