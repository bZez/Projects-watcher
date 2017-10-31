$('.plus-btn').click(function(){
  $('body').toggleClass('menu-open');
    $('#h1, #h2, #h6').delay(1000).fadeToggle();
})
$('#liste').click(function(){
    $('body').toggleClass('menu-open');
    $('#h1:visible, #h2:visible, #h6:visible').toggle();
})

function popupCenter(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        chargerXML(this);
    }
};
xhttp.open("GET", "http://e2simplon.fr/Apprenants.php", true);
xhttp.send();

function chargerXML(xml) {
    var xmlDoc = xml.responseXML;
    txt = '';
    x = xmlDoc.getElementsByTagName("apprenant");
    for (i = 0; i < x.length; i++) {
        var nom = x[i].getAttribute("nom").sansAccent();
        var prenom = x[i].getAttribute("prenom").sansAccent();
        txt += '<li class="itemenu"><a onclick="projetXML(\''+prenom+'\', \''+nom+'\' );" href="#" target="_self">'+ nom.toUpperCase() + " " + prenom+ '</a></li>';
    }
    document.getElementById("liste").innerHTML = txt;
}

function projetXML(prenom, nom) {
    var projets, i, len;
    var addresse = prenom + nom.charAt(0);
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.open("GET", "http://" + addresse + ".e2simplon.fr/projets.php", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    textProjet = '';
    projets = xmlDoc.getElementsByTagName("projet");

    len = projets.length;
    textProjet += "<h1>" + prenom + "</h1>";
    for (i = 0; i < len; i++) {
        var projet = projets[i].getAttribute("nom");
        var lien = projets[i].getAttribute("lien");
        textProjet += '<div class="projetctn"><h2>\''+projet.toUpperCase() + '\'</h2><br/><a class="button" onclick="popupCenter(\''+lien+'\',\''+projet+'\',950,600);">Voir</a></div><br/>';
    }
    document.getElementById("apercu").innerHTML = textProjet;
}

String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
}