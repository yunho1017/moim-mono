const axios = require("axios");
const config = require("../poeditor-config.json");
const qs = require("query-string");

async function getListLanguages() {
  const { data } = await axios.post("https://api.poeditor.com/v2/languages/list", qs.stringify({
    api_token: config.apiToken,
    id: config.projectId,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return data.result.languages.map(item => item.code);
}

async function downloadFile(url) {
  const { data } = await axios.get(url);
  return data;
}

async function getExportData(language) {
  const { data } = await axios.post("https://api.poeditor.com/v2/projects/export", qs.stringify({
    api_token: config.apiToken,
    id: config.projectId,
    language,
    type: "key_value_json",
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return downloadFile(data.result.url);
}



module.exports = {
  getListLanguages,
  getExportData,
  config,
};
