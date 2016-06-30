/**
 * String Utils 
 */
(function(){
    String.prototype.exist = function(str){
        return this.indexOf(str)>-1 ? true : false;
    };
}());
