/* module */
function systemHelp(): Record<string, any> {
  const helpObject = {
    name: "https://bible-api.com/",
    about: "This is a tiny little web app that provides a JSON API for grabbing bible verses and passages.",
    translations: {
      "1": {
        language: "Cherokee",
        name: "Cherokee New Testament",
        identifier: "cherokee",
      },
      "2": {
        language: "Czech",
        name: "Bible kralická",
        identifier: "bkr",
      },
      "3": {
        language: "English",
        name: "American Standard Version (1901)",
        identifier: "asv",
      },
      "4": {
        language: "English",
        name: "Bible in Basic English",
        identifier: "bbv",
      },
      "5": {
        language: "English",
        name: "Darby Bible",
        identifier: "darby",
      },
      "6": {
        language: "English",
        name: "Douay-Rheims 1899 American Edition",
        identifier: "dra",
      },
      "7": {
        language: "English",
        name: "King James Version",
        identifier: "kjv",
      },
      "8": {
        language: "English (Default)",
        name: "World English Bible",
        identifier: "web",
      },
      "9": {
        language: "English",
        name: "Young's Literal Translation",
        identifier: "ylt",
      },
      "10": {
        language: "English (UK)",
        name: "Open English Bible, Commonwealth Edition",
        identifier: "	oeb-cw",
      },
      "11": {
        language: "English (UK)",
        name: "World English Bible, British Edition",
        identifier: "webbe",
      },
      "12": {
        language: "English (US)",
        name: "Open English Bible, US Edition",
        identifier: "oeb-us",
      },
      "13": {
        language: "Latin",
        name: "Clementine Latin Vulgate",
        identifier: "clementine",
      },
      "14": {
        language: "Portuguese",
        name: "João Ferreira de Almeida",
        identifier: "almeida",
      },
      "15": {
        language: "Romanian",
        name: "Protestant Romanian Corrected Cornilescu Version",
        identifier: "rccv",
      },
    }
  };
  return helpObject;
}

/* exports */
export default systemHelp;
