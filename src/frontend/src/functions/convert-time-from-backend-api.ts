const ConvertTimeFromBackendApi = (strTime: string): string => {
  const splittedTime = strTime.split("T");
  if (splittedTime.length > 1) {
    const inversedDateStr = splittedTime[0].split("-").reverse().join(".");
    const timeArr = splittedTime[1].split(":");
    let timeStr = "";

    if (timeArr.length > 1) {
      timeStr = timeArr.slice(0, timeArr.length-1).join(":");
    }

    return `${inversedDateStr}r. ${timeStr}`;
  }

  return "";
};

export default ConvertTimeFromBackendApi;