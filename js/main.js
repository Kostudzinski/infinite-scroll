'use strict';

function ajax(ajaxOptions) {
    
//    Opcje polaczenia i jego typu (|| to nie lub tylko inicjacja)
    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function() {},
        onSuccess: ajaxOptions.onSuccess || function() {},
        dataType: ajaxOptions.dataType || 'text'
        
    }
    
    function httpSuccess( httpRequest ) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined' );
        } catch(e) {
            return false;
        }
    }
    
//    Utworz obiekt XMLHttpRequest
    var httpReq = new XMLHttpRequest();
    
//    otworz polaczenie
    httpReq.open(options.type, options.url, true);
    
//    iterowanie za kazdym razem kiedy zmienia sie ready state
    httpReq.onreadystatechange = function() {
        if(this.readyState == 4) {
            
//            sprawdz status polaczenia - funkcja httpSuccess
            if ( httpSuccess(httpReq)) {
                
//                jesli dane w formacie XML , to zwroc obiekt responseXML, otherwise responseText (json to tekst)
                var returnData = (options.dataType == 'xml')? this.responseXML : this.responseText;
                
                options.onSuccess(returnData);
                
                httpReq = null;
            } else {
                options.onError(console.log('błąd'));
            }
        }
    }
    
    httpReq.send();
}

window.onscroll = function () {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        

ajax({
    type: 'GET',
    url: 'http://jsonplaceholder.typicode.com/users',
    onError: function(msg) {
        console.log(msg);
    },
    onSuccess: function(response) {
            var jsonObjArray = JSON.parse(response);
            
            var beginOfData = document.createElement('p');
            var endOfData = document.createElement('p');
        
        beginOfData.innerHTML = '<br>--------------Begin Of Data-----------------<br><br>'
        endOfData.innerHTML = '<br>---------------End Of Data-------------------<br><br>'
        
        document.body.appendChild(beginOfData);
        
        for(var i in jsonObjArray) {

            var userId = document.createElement('p');
            userId.innerHTML = 'User ID: ' + jsonObjArray[i].id;
            
            var userName = document.createElement('p');
            userName.innerHTML = 'User Name: ' + jsonObjArray[i].name;
            
            var userUrl = document.createElement('p');
            userUrl.innerHTML = 'user Url: ' + jsonObjArray[i].website;
            
            
                document.body.appendChild(userId);
                document.body.appendChild(userName);
                document.body.appendChild(userUrl);
                document.body.appendChild(endOfData);

        }
        

    }
});
    }

}
