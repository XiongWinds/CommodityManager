var dbName = "MyData";
var dbVersion = 20190514;
var idb,datatable;
function window_onload(){
    datatable = document.getElementById("datatable");
    var dbConnect = window.indexedDB.open(dbName,dbVersion);
    dbConnect.onsuccess = function(e){
        idb = e.target.result;
        window.console.info("连接数据库成功");
        var tx = idb.transaction(['orders'],'readonly');
        var store = tx.objectStore('orders');
        var req=store.count();
        req.onsuccess=function(){
            if(this.result == 0) window.console.info("没有结果");
            else showAllData(e);
        }
    };
    dbConnect.onerror=function(){
        window.console.info("数据库连接失败");
    };
    dbConnect.onupgradeneeded=function(e){
        idb=e.target.result;
        if(!idb.objectStoreNames.contains('orders')){
            var tx = e.target.transaction;
            tx.oncomplete=function(){
                showAllData(true);
            };
            tx.onabort=function(){
                window.info("对象仓库创建失败！");
            };
            var name="orders";
            var optionalParameters={
                keyPath:'id',
                autoIncrement:true
            };
            var store=idb.createObjectStore(name,optionalParameters);
            window.console.info("对象仓库创建成功！");
            name="codeIndex";
            var keyPath="code";
            optionalParameters={
                unique:true,
                multiEntry:false
            };
            var idx=store.createIndex(name,keyPath,optionalParameters);
            window.console.info("对象索引创建成功！")
        }
    };
}
function showAllData(loadPage){
    if(!loadPage){
        removeAllData();
    }
    var tx = idb.transaction(['orders'],"readonly");
    var store = tx.objectStore('orders');
    var req = store.getAll();
    var i = 0;
    req.onsuccess = function(){
        var goods = this.result;
        for( var j = 0 ; j < goods.length ; ++j ){
            i+=1;
            showData(goods[j],i);
        }
        document.getElementById("btnUpdate").disabled = true;
        document.getElementById("btnDelete").disabled = true;
    }
    req.onerror = function(){
        console.info("返回数据失败！");
    }
}
function removeAllData(){
    for(var i = datatable.childNodes.length-1;i>1;i--){
        datatable.removeChild(datatable.childNodes[i]);
    }
}
function showData(row,i){
    var tr = document.createElement('tr');
    tr.setAttribute("onclick","tr_onclick(this,"+i+")");
    var td1 = document.createElement("td");
    td1.innerText= row.code;
    var td2 = document.createElement('td');
    td2.innerText = row.date;
    var td3 = document.createElement("td");
    td3.innerText= row.goodsCode;
    var td4 = document.createElement('td');
    td4.innerText = row.brand;
    var td5 = document.createElement("td");
    td5.innerText= row.count;
    var td6 = document.createElement('td');
    td6.innerText = row.price;
    var td7 = document.createElement("td");
    td7.innerText= parseInt(row.count)*parseFloat(row.price);
    var td8 = document.createElement('td');
    td8.innerText = row.person;
    var td9 = document.createElement("td");
    td9.innerText= row.email;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);
    tr.appendChild(td9);
    datatable.appendChild(tr);
}
function btnAdd_onclick(){
    var data = new Object();
    data.code = document.getElementById("tbxCode").value;
    data.date = document.getElementById("tbxDate").value;
    data.goodsCode = document.getElementById("tbxGoodsCode").value;
    data.brand = document.getElementById("tbxBrandName").value;
    data.count = document.getElementById("tbxNum").value;
    data.price = document.getElementById("tbxPrice").value;
    data.person = document.getElementById("tbxPersonName").value;
    data.email = document.getElementById("tbxEmail").value;

    var tx = idb.transaction(['orders'],'readwrite');
    var chkErrorMsg = "";
    tx.oncomplete = function (ev) {
        if(chkErrorMsg!=""){
            window.console.info(chkErrorMsg);
        }else{
            alert("数据追加成功！");
            showAllData(false);
            btnNew_onclick();
        }
    }
    tx.onabort = function(){
        alert("数据追加失败！");
    }

    var store = tx.objectStore('orders');
    var idx = store.index("codeIndex");
    var req = idx.count(data.code);
    req.onsuccess = function(){
        var count = this.result;
        if( count > 0 ){
            chkErrorMsg = "输入的订单在数据库中已经存在!";
        }else{
            store.put(data);
        }
    }
    req.onerror = function(){
        alert("追加数据失败！");
    }
}

function btnNew_onclick(){
    document.getElementById("tbxCode").value = "";
    document.getElementById("tbxDate").value = "";
    document.getElementById("tbxGoodsCode").value = "";
    document.getElementById("tbxBrandName").value = "";
    document.getElementById("tbxNum").value = "";
    document.getElementById("tbxMoney").value = ""
    document.getElementById("tbxPrice").value = "";
    document.getElementById("tbxPersonName").value = "";
    document.getElementById("tbxEmail").value = "";
    document.getElementById("btnAdd").disabled = false;
    document.getElementById("tbxCode").disabled = false;
}
function btnUpdate_onclick(){
    var code = document.getElementById("tbxCode").value;
    if( code == "" || code == undefined  ) {
        var tb = document.getElementById("datatable");
        var tr = tb.getElementsByTagName("tr");
        if( tr.length < 2 ){
            document.getElementById("btnNew").enabled = true;
        }else{
            alert("请先选择一行！");
        }
        return;
    }

    var data = new Object();
    data.code = document.getElementById("tbxCode").value;
    data.date = document.getElementById("tbxDate").value;
    data.goodsCode = document.getElementById("tbxGoodsCode").value;
    data.brand = document.getElementById("tbxBrandName").value;
    data.count = document.getElementById("tbxNum").value;
    data.price = document.getElementById("tbxPrice").value;
    data.person = document.getElementById("tbxPersonName").value;
    data.email = document.getElementById("tbxEmail").value;
    var tx = idb.transaction(['orders'],'readwrite');
    tx.oncomplete = function(){
        alert('修改数据成功！');
        showAllData(false);
    }
    tx.onabort = function(){
        alert('修改数据失败!');
    }
    var store = tx.objectStore('orders');
    var idx = store.index('codeIndex');
    var range = IDBKeyRange.only(data.code);
    var direction = "next";
    var req = idx.openCursor(range,direction);
    req.onsuccess = function(){
        var cursor = this.result;
        console.info(cursor.value.id);
        if(cursor){
            data.id = cursor.value.id;
            cursor.update(data);
        }
    }
    req.onerror = function(){
        alert("修改数据失败！");
    }
}

function btnDelete_onclick(){
    var data = new Object();
    data.code = document.getElementById("tbxCode").value;
    data.date = document.getElementById("tbxDate").value;
    data.goodsCode = document.getElementById("tbxGoodsCode").value;
    data.brand = document.getElementById("tbxBrandName").value;
    data.count = document.getElementById("tbxNum").value;
    data.price = document.getElementById("tbxPrice").value;
    data.person = document.getElementById("tbxPersonName").value;
    data.email = document.getElementById("tbxEmail").value;
    var tx = idb.transaction(['orders'],'readwrite');
    tx.oncomplete = function(){
        alert('删除数据成功！');
        showAllData(false);
    }
    tx.onabort = function(){
        alert('删除数据失败!');
    }
    var store = tx.objectStore('orders');
    var idx = store.index('codeIndex');
    var range = IDBKeyRange.only(data.code);
    var direction = "next";
    var req = idx.openCursor(range,direction);
    req.onsuccess = function(){
        var cursor = this.result;
        console.info(cursor.value.id);
        if(cursor){
            data.id = cursor.value.id;
            cursor.delete(data);
            btnNew_onclick();
        }
    }
    req.onerror = function(){
        alert("删除数据失败！");
    }
}

function btnClear_onclick(){
    btnNew_onclick();
}

function tbxNum_onblur(){
    var num = document.getElementById("tbxNum").value;
    if( num == "" || num == undefined || num <= 0){
        alert("请输入大于零的数字");
    }
}
function tbxPrice_onblur(){
    var num = document.getElementById("tbxNum").value;
    var price = document.getElementById("tbxPrice").value;
    var money = document.getElementById("tbxMoney");
    money.value = parseInt(num)*parseFloat(price);
}
function tr_onclick(tr,i){
    console.info(tr);
    console.info(tr.cells[0]);
    console.info(tr.cells[0].innerText);
    document.getElementById("tbxCode").value = tr.cells[0].innerText;
    document.getElementById("tbxDate").value = tr.cells[1].innerText;
    document.getElementById("tbxGoodsCode").value = tr.cells[2].innerText;
    document.getElementById("tbxBrandName").value = tr.cells[3].innerText;
    document.getElementById("tbxNum").value = tr.cells[4].innerText;
    document.getElementById("tbxMoney").value = tr.cells[5].innerText
    document.getElementById("tbxPrice").value = tr.cells[6].innerText;
    document.getElementById("tbxPersonName").value = tr.cells[7].innerText;
    document.getElementById("tbxEmail").value = tr.cells[8].innerText;

    document.getElementById("tbxCode").disabled="disabled";
    document.getElementById("btnAdd").disabled = true;
    document.getElementById("btnClear").disabled = true;
    document.getElementById("btnUpdate").disabled = false;
    document.getElementById("btnDelete").disabled = false;
    document.getElementById("btnNew").enabled = true;
    console.info(document.getElementById("btnAdd").disabled);
}