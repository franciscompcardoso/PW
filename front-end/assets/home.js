window.onload = () => {
let user_id = getCookie('id');
console.log(getCookie('id'));

    //fetch para buscar preencher o menu com os dados do utilizador
    const renderMenu = async () =>{
    const response1 = await fetch(`http://localhost:3000/user/inf/${user_id}`);
    const p = await response1.text();
    const user = p[0];
    

    
    }
    renderMenu();
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

      function deleteCookie(name) { setCookie(name, '', -1); }

      function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    