export const validateTemplate = (template: string) => {
  let i = 0;
  let isError = false;

  while (i < template.length) {
    // Case handled: Only one opening bracket "{"
    if (template[i] === "{" && template[i + 1] !== "{") {
      isError = true;
      break;
    }

    // Case handled: No opening bracket
    if (template[i] === "}") {
      isError = true;
      break;
    }

    // Case handled: Two opening brackets "{{"
    if (template[i] === "{" && template[i + 1] === "{") {
      let j = i + 2;
      let midStr = "";

      while (j < template.length) {
        // Case handled: Only one closing bracket "}"
        if (template[j] === "}" && template[j + 1] !== "}") {
          isError = true;
          break;
        }

        // Case handled: Two closing brackets "}}"
        if (template[j] === "}" && template[j + 1] === "}") {
          break;
        }

        // Case handled: No closing bracket
        if (j === template.length - 1) {
          isError = true;
          break;
        }

        midStr += template[j];
        j++;
      }

      // Case handled: No space in between the brackets or empty string
      if (midStr.includes(" ") || midStr === "") {
        isError = true;
        break;
      }

      i = j + 2;
    }

    i++;
  }

  return !isError;
};

export const getTemplatePlaceholders = (template: string) => {
  const regex = /\{\{([a-zA-Z0-9]+)\}\}/g;
  const placeholders: string[] = [];

  const matches = template.match(regex);

  if (matches) {
    matches.forEach((match) => {
      placeholders.push(match);
    });
  }

  return placeholders;
};
