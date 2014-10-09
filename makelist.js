document.addEventListener('DOMContentLoaded', function() {
  var ul = document.getElementById('list');

  var jdata = JSON.parse(data);

  var htitle = document.createTextNode(jdata['title']);
  var btitle = htitle;
  document.getElementById('htitle').appendChild(htitle);
  document.getElementById('btitle').appendChild(btitle);

  for (var i = 0; i < jdata.list.length; i++) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = jdata['uristart'] + jdata.list[i] + jdata['uriend'];
    var t = document.createTextNode( jdata.list[i] );

    a.appendChild(t);
    li.appendChild(a);
    ul.appendChild(li);
  }
});
