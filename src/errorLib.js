const errorCheck = function(type, value, files) {
  let errorWord = {
    n: "line",
    c: "byte"
  };
  if (type != "n" && type != "c") {
    return (
      "head: illegal option -- " +
      type +
      "\nusage: head [-n lines | -c bytes] [file ...]"
    );
  }
  if (value < 1 || (isNaN(value) && value != undefined)) {
    return "head: illegal " + errorWord[type] + " count -- " + value;
  }
  if (files.length == 0) {
    return (
      "head: option requires an argument -- " +
      type +
      "\nusage: head [-n lines | -c bytes] [file ...]"
    );
  }
};

exports.errorCheck = errorCheck;
