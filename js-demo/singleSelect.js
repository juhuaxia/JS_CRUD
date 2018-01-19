(function(){
    window.SingleSelect = function(options){
        this.options = options;
        this._init();
        this._initEvent();
        this._selectedDom = null;
    }

    SingleSelect.prototype = {
        _init:function(){
            if(!this.options['content']){
                throw new Error('content is empty');
            };
            if(!this.options['targetClass']){
                throw new Error('targetClass is empty');
            };
            if(!this.options['selectClass']){
                throw new Error('selectClass is empty');
            };
            if(typeof this.options['content'] === 'string'){
                this.options['content'] = document.getElementById(this.options['content']);
            }
        },
        _initEvent:function(){
            var that = this;
            this.options['content'].addEventListener('click',function(e){
                var target = e.target;
                while(target !== that.options['content']){
                    if(target.className == that.options['targetClass']){
                        if(that._selectedDom){
                            var className = that._selectedDom.className.replace(" "+that.options['selectClass'],'');
                            that._selectedDom.className = className;
                        }
                        target.className += ' '+that.options['selectClass'];
                        that._selectedDom = target;
                        break;
                    }
                    target = target.parentNode;
                }
            })
        },
        getSelected:function(){
            return this._selectedDom;
        }
    }
})()