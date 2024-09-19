window.onload = () => {
    let user_id = getCookie('id');


const renderPerfil = async () =>{
    const response2 = await fetch(`http://localhost:3000/user/inf/${user_id}`);
    const ps = await response2.json();
    const user = ps[0];

    document.getElementById("nome").innerHTML=user.nome;
    document.getElementById("apelido").innerHTML=user.apelido;
    document.getElementById("email").innerHTML=user.email;
  }

  renderPerfil();
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
