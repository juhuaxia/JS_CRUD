(function(){
    var resultData = [],
    pageIndex = 0,
    pageSize = 10,
    //弹出框
    MyModal = new Modal(),
    //单选模块
    MySingleSelect = new SingleSelect({
        content:'list',
        targetClass:'list-item',
        selectClass:'sel-item'
    }),
    //更新模块
    MyUpdate = new UpdateModule();
    //删除模块
    MyDelete = new DeleteModule();
    //查询模块
    MySearch = new SearchModule();
    //增加模块
    MyAdd = new AddModule();

    var loadMoreDataBtn = document.getElementById('loadMoreData'),
        addBtn = document.getElementById('add'),
        updateBtn = document.getElementById('update'),
        deleteBtn = document.getElementById('delete'),
        searchIdBtn = document.getElementById('searchById'),
        searchTitleBtn = document.getElementById('searchTitle'),
        addBeforeBtn = document.getElementById('addBefore'),
        addAfterBtn = document.getElementById('addAfter'),
        addChildBtn = document.getElementById('addChild'),
        listDom = document.getElementById('list');

    //events
    (function(){
        loadMoreDataBtn.addEventListener('click',function(){
            createPages(true);
            pageIndex++;
        })
        updateBtn.addEventListener('click',function(){
            var selected = MySingleSelect.getSelected();
            if(selected){
                MyModal.show();
                MyModal.setCallback(function(){
                    var val = MyModal.getValue();
                    var testEl = selected.firstChild;
                    MyUpdate.update(testEl,val);
                })
            }else{
                alert('请选中一条数据进行修改！')
            }
        })
        deleteBtn.addEventListener('click',function(){
            var selected = MySingleSelect.getSelected();
            if(selected){
                MyDelete.delete(selected);
            }else{
                alert('请选中一条数据！')
            }
        })
        searchIdBtn.addEventListener('click',function(){
            MyModal.show();
            MyModal.setCallback(function(){
                var val = MyModal.getValue();
                var searchResult = MySearch.searchById(val);
                pageIndex = 0;
                pageSize = 10;
                createPages(false,searchResult,'create');
            })
        })
        searchTitleBtn.addEventListener('click',function(){
            MyModal.show();
            MyModal.setCallback(function(){
                var val = MyModal.getValue();
                var searchResult = MySearch.searchByTitle(val);
                pageIndex = 0;
                pageSize = 10;
                createPages(false,searchResult,'create');
            })
        })
        addBtn.addEventListener('click',function(){
            MyModal.show();
            MyModal.setCallback(function(){
                var val = MyModal.getValue();
                var addItem = createListItem(val);
                MyAdd.add(listDom,addItem,'childBefore')
            })
        })
        addBefore.addEventListener('click',function(){
            MyModal.show();
            MyModal.setCallback(function(){
                var val = MyModal.getValue();
                var addItem = createListItem(val);
                var selected = MySingleSelect.getSelected();
                if(selected){
                    MyAdd.add(selected,addItem,'before')
                }else{
                    MyAdd.add(listDom,addItem,'childBefore')
                }
            })
        })
        addAfter.addEventListener('click',function(){
            MyModal.show();
            MyModal.setCallback(function(){
                var val = MyModal.getValue();
                var addItem = createListItem(val);
                var selected = MySingleSelect.getSelected();
                if(selected){
                    MyAdd.add(selected,addItem,'after')
                }else{
                    MyAdd.add(listDom,addItem,'childBefore')
                }
            })
        })
        addChild.addEventListener('click',function(){
            MyModal.show();
            MyModal.setCallback(function(){
                var val = MyModal.getValue();
                var addItem = createListItem(val);
                var selected = MySingleSelect.getSelected();
                if(selected){
                    MyAdd.add(selected,addItem,'childAfter')
                }else{
                    MyAdd.add(listDom,addItem,'childBefore')
                }
            })
        })
    })()

    new MyAjax({
        url:'https://jsonplaceholder.typicode.com/albums',
        success:function(res){
            res = typeof res === 'string' ?JSON.parse(res) : res;
            resultData = res;
            MySearch.initData(resultData);
            createPages(true);
        }
    });


    function createPages(paging,data,type){
        data = data || resultData;
        // type = type || 'add';
        if(pageIndex == 0){
            type = 'create';
        }else{
            type = 'add';
        }
        if(data.length>0 &&pageSize*pageIndex>=data.length){
            return;
        }
        
        var s = '',
            i = 0,
            l = pageSize<=data.length?pageSize:data.length;
        for(;i<l;i++){
            var item = data[pageSize*pageIndex+i],
                title = item.title || '';
            s += createListItem(title);
        }
        switch(type){
            case 'add':
                listDom.insertAdjacentHTML('beforeend',s);
                break;
            case 'create':
                listDom.innerHTML = s;
                break;
        }
        if(paging){
            pageIndex ++ ;
        }
    }

    function createListItem(title){
        var s = '<div class="list-item">'
                    +'<span>'+title+'</span>'
                    +'<img src="http://via.placeholder.com/80x50"/>'
                +'</div>';
        return s;
    }
})();