var exec = require('child_process').exec;

// Hexo 2.x
hexo.on('new', function(path){
    exec('typora' + path);
});
