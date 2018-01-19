(function(){
    window.AddModule = function(){

    }
    AddModule.prototype = {
        add:function(targetDom,dom,position){
            if(position == 'before'){
                targetDom.insertAdjacentHTML('beforebegin',dom)
            }else if(position == 'after'){
                targetDom.insertAdjacentHTML('afterend',dom)
            }else if(position == 'childBefore'){
                targetDom.insertAdjacentHTML('afterbegin',dom)
            }else if(position == 'childAfter'){
                targetDom.insertAdjacentHTML('beforeend',dom)
            }
        }
    }
})()