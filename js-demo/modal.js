(function(){
    window.Modal = function(options){
        this._init();
    }

    Modal.prototype = {
        _init:function(){
            this._el = document.createElement('div');
            this._el.className = 'modal';
            this._initHtml();
            this._innerEl = this._el.firstChild;
            this._textEl = this._innerEl.firstChild;
            this._okEl = this._innerEl.lastChild;

            this._initEvent();

        },
        show:function(){
            this._el.style.display = '-webkit-box';
        },
        _initHtml:function(){
            var s = '<div class="modal-inner"><input type=text /><button>ok</button></div>';
            this._el.innerHTML = s;
            document.body.appendChild(this._el);
        },
        _initEvent:function(){
            var that = this;
            this._okEl.addEventListener('click',function(){
                that.callback.call(that);
                that.hide();
            })
            this._el.addEventListener('click',function(e){
                if(e.target.className == 'modal'){
                    that.hide();
                }
            })
        },
        hide:function(){
            this._el.style.display = 'none';
            this.clareVal();
        },
        setCallback:function(callback){
            (typeof callback === 'function') && (this.callback = callback);
        },
        getValue:function(){
            return this._textEl.value;
        },
        clareVal:function(){
            this._textEl.value = '';
        }
    }
})()