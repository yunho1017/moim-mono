function replaceLineBreakString(str: string, replaceStr: string = "") {
  return str.replace(/(\r\n|\n|\r)/gm, replaceStr);
}

export default replaceLineBreakString;
