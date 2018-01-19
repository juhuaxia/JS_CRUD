(function(){
    window.SearchModule = function(){
        this.data = [];
        this._dataMap = {};
        this._searchKey = '';
    }
    SearchModule.prototype = {
        initData:function(data){
            if(data instanceof Array){
                this.data = data;
                this._arr2map();
            }else{
                throw new Error('data must be Array')
            }
        },
        searchById:function(key){
            this._searchKey = key;
            return ([this._dataMap[key]] || []);
        },
        searchByTitle:function(key){
            this._searchKey = key;
            return this.filterData();
        },
        _arr2map:function(){
            for(var i=0,l=this.data.length;i<l;i++){
                var item = this.data[i],
                    id = (item.id === undefined ?('no_id_'+i):item.id);
                this._dataMap[id] = item;
            }
        },
        filterData:function(){
            var result = [];
            for(var i=0,l=this.data.length;i<l;i++){
                var item = this.data[i],
                    title = item.title;
                if(title.indexOf(this._searchKey)>=0){
                    result.push(item);
                }
            };
            return result;
        }
    }
})()