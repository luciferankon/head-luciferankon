const errorCheck = function(type, value, files){
  let errorWord = {
    'n' : 'line',
    'c' : 'byte'
  };
  if(files.length == 0){
    return 'head: option requires an argument -- ' +type +'\nusage: head [-n lines | -c bytes] [file ...]';
  }
  if(type != 'n' && type != 'c'){
    return 'head: illegal option -- '+ type +'\nusage: head [-n lines | -c bytes] [file ...]';
  }
  if(value < 1 || isNaN(value)){
    return 'head: illegal ' + errorWord[type]+ ' count -- ' + value;
  }
}

exports.errorCheck = errorCheck;
