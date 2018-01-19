(function(){
    window.UpdateModule = function(){

    }
    
    UpdateModule.prototype = {
        update:function(dom,str){
            dom.innerHTML = str;
        }
    }
})()