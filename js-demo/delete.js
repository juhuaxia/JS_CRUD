(function(){
    window.DeleteModule = function(){

    }
    
    DeleteModule.prototype = {
        delete:function(dom){
            var parentNode = dom.parentNode;
            if(dom.parentNode){
                parentNode.removeChild(dom);
            }
        }
    }
})()