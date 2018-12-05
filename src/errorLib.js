const errorCheck = function(type, value){
  let errorWord = {
    'n' : 'line',
    'c' : 'byte'
  };
  if(type != 'n' && type != 'c' && type != ''){
    return 'head: illegal option -- '+ type +'\nusage: head [-n lines | -c bytes] [file ...]';
  }
  if((value != '' && value < 1) || isNaN(+value)){
    return 'head: illegal ' + errorWord[type]+ ' count -- ' + value;
  }
}

exports.errorCheck = errorCheck;
