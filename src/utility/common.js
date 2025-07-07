const downloadDataToFile = (data, filename, type) => {
  const blob = new Blob([data], { type: `text/${type};charset=utf-8;` });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}.${type}`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export const generateCSV = (data, filename) => {
  let csv = "";
  data.forEach((row) => {
    csv += row.join(",");
    csv += "\n";
  });
  downloadDataToFile(csv, filename, "csv");
};

export const caseInsensitiveSort = (valueA, valueB) => {
  const a = valueA.toLowerCase();
  const b = valueB.toLowerCase();
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
  return 0;
  return 1;
};
