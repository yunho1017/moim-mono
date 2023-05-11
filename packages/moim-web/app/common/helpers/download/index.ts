import axios from "axios";

export default async function downloadManager(src: string, filename: string) {
  const result = await axios({
    url: src,
    method: "GET",
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([result.data]));

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(url);
  }, 1000);
}
