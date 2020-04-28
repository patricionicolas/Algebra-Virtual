$(document).ready(Principal);
  function Principal(){

    $("#inp1").on('input', function(){Hola($(this).val())});
    $("#inp1").keypress(function(num){num.preventDefault();}); //se impide ingresar numeros
    $("#pV, #qV, #rV, #sV, #zV, #pF, #qF, #rF, #sF, #zF").click(function(){Activar(this.id)});

//----------------------------------------------------------- DESDE AQUí MÉTODOS Y FUNCIONES ROBERTO ------------------------
    var VF = {p:null,q:null,r:null,s:null,z:null};

    $(document).on("click","#pV",function(){VF.p=true;$("#pV").remove();$("#pF").remove();$("#vf0").append("<button class='smallV'>V</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#qV",function(){VF.q=true;$("#qV").remove();$("#qF").remove();$("#vf1").append("<button class='smallV'>V</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#rV",function(){VF.r=true;$("#rV").remove();$("#rF").remove();$("#vf2").append("<button class='smallV'>V</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#sV",function(){VF.s=true;$("#sV").remove();$("#sF").remove();$("#vf3").append("<button class='smallV'>V</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#zV",function(){VF.z=true;$("#zV").remove();$("#zF").remove();$("#vf4").append("<button class='smallV'>V</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#pF",function(){VF.p=false;$("#pF").remove();$("#pV").remove();$("#vf0").append("<button class='smallF'>F</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#qF",function(){VF.q=false;$("#qF").remove();$("#qV").remove();$("#vf1").append("<button class='smallF'>F</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#rF",function(){VF.r=false;$("#rF").remove();$("#rV").remove();$("#vf2").append("<button class='smallF'>F</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#sF",function(){VF.s=false;$("#sF").remove();$("#sV").remove();$("#vf3").append("<button class='smallF'>F</button>");$("#inp1").attr("disabled","disabled");});
    $(document).on("click","#zF",function(){VF.z=false;$("#zF").remove();$("#zV").remove();$("#vf4").append("<button class='smallF'>F</button>");$("#inp1").attr("disabled","disabled");});

    $(document).on("click",".vL1",function(){JuegueL($(this).text(),VF)});  //al hacer click en cualquier botón
    $("#respuesta").click(LetsDoThat);
    $("#borrarPL").click(Vaciarprop);
    $("#restartPL").click(RecargarPag);
    $(".smallV, .smallF").click(Instru2);
    $(".big").click(Instru3y4);

    }  //fin función principal

    var prop = [];
    var verP = [];
    var caso13 = [];
    var sepuede = true;

    function Activar(elid){
      var temporal1 = elid.substring(0,1);   // sacamos el primer caracter del string (la id) que estoy recibiendo
      var activarID = "the"+temporal1;
      $("#"+activarID).removeAttr("disabled");
      $("#"+activarID).addClass("habilitado");
      $(".vL3n").removeAttr("disabled");        //activo negado
    }

    function RecargarPag(){
      location.reload();    //recargo la página
    }

    function Vaciarprop(){
      prop.length = 0;      //vaciamos el arreglo prop
      verP.length = 0;      //también el arreglo verP
      $("#PLF").empty();    //vaciamos la celda de la proposición
      $("#VoF").empty();    //vaciamos la celda de resultados
      $(".procedimiento").remove();   //quitamos las divs del procedimiento
      $(".vL3n").removeAttr("disabled");        //activo negado
      $(".habilitado").removeAttr("disabled");  //activo p q r s z
      $(".vL3i").removeAttr("disabled");        //activo (
      $(".vL3f").attr("disabled","disabled");   //desactivo )
      $(".oL").attr("disabled","disabled");     //desactivo V ∧ => <=>
      sepuede = true;
    }

    function lsl(letra1,simbolo,letra2){
            if(simbolo=="&&") return eval(letra1) && eval(letra2);
            if(simbolo=="||") return eval(letra1) || eval(letra2);
            if(simbolo=="⇒") return Condicional(eval(letra1),eval(letra2));
            if(simbolo=="⇔") return Bicondicional(eval(letra1),eval(letra2));
    }

    function lslsl(arreglo){
            if(arreglo[1]=="⇔" || (arreglo[1]=="⇒" && arreglo[3]!="⇔")){    
              return lsl(arreglo[0],arreglo[1],lsl(arreglo[2],arreglo[3],arreglo[4]))
            }                                                                                    //            [1]          [3]         [1]        [3]
            if((arreglo[1]!="⇒" && arreglo[1]!="⇔") || (arreglo[1]=="⇒" && arreglo[3]=="⇔")){   //puede ser &&|| y luego ⇒⇔    o     ⇒ y luego ⇔
              return lsl(lsl(arreglo[0],arreglo[1],arreglo[2]),arreglo[3],arreglo[4])
            }
          }

      function lslslsl(arreglo){
        var tem1=[arreglo[2],arreglo[3],arreglo[4],arreglo[5],arreglo[6]]
        var tem2=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4]]

        if(arreglo[1]=="⇔"){
          return lsl(arreglo[0],arreglo[1],lslsl(tem1))
        }
        if(arreglo[3]=="⇔" || arreglo[3]=="⇒"){
          return lsl(lsl(arreglo[0],arreglo[1],arreglo[2]),arreglo[3],lsl(arreglo[4],arreglo[5],arreglo[6]))
        }
        if(arreglo[5]=="⇔"){
          return lsl(lslsl(tem2),arreglo[5],arreglo[6])
        }
    }

    var largo11 = ["true","⇒","true","&&","true","⇔","true","⇒","true","&&","false",]               //antiguo caso máximo
                                            //papa        papa
    var a13 = ["true","⇒","true","&&","true","⇔","true","&&","true","⇒","true","&&","false",]                                        
    var b13 = ["true","&&","true","⇒","true","&&","false","⇔","true","⇒","true","&&","false",]
    var a15 = ["true","&&","true","⇒","false","&&","true","⇔","true","&&","false","⇒","true","&&","false",]

    function dentro(arreglo){
      var largo = arreglo.length;         //el largo máximo será 13 y 15 // p ∧ q ⇒ p ∨ r ⇔ p ∧ q ⇒ q ∧ r
      if(largo==1) return eval(arreglo[0]);
      if(largo==3){    //casos lsl
        return lsl(arreglo[0],arreglo[1],arreglo[2])
      }
      if(largo==5){    //casos lslsl
        return lslsl(arreglo);
      }
      if(largo==7){    //casos lslslsl       
        return lslslsl(arreglo);
      }
      if(largo==9){     //casos lslslslsl    (este trozo de código no lo reutilizaré, por eso no lo pongo en una función)
        var tem1=[arreglo[2],arreglo[3],arreglo[4],arreglo[5],arreglo[6],arreglo[7],arreglo[8]];
        var tem2=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4],arreglo[5],arreglo[6]];

        var tem3=[arreglo[4],arreglo[5],arreglo[6],arreglo[7],arreglo[8]];
        var tem4=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4]];

        if(arreglo[1]=="⇔"){
          return lsl(arreglo[0],arreglo[1],lslslsl(tem1));
        }
        if(arreglo[3]=="⇔"){
          return lsl(lsl(arreglo[0],arreglo[1],arreglo[2]),arreglo[3],lslsl(tem3));
        }
        if(arreglo[5]=="⇔"){
          return lsl(lslsl(tem4),arreglo[5],lsl(arreglo[6],arreglo[7],arreglo[8]));
        }
        if(arreglo[7]=="⇔"){
          return lsl(lslslsl(tem2),arreglo[7],arreglo[8]);
        }
      }
      if(largo==11){
        var tem1=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4]];
        var tem2=[arreglo[6],arreglo[7],arreglo[8],arreglo[9],arreglo[10]];
        return lsl(lslsl(tem1),arreglo[5],lslsl(tem2));
      }
      if(largo==13){
        var tem1=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4]];
        var tem2=[arreglo[8],arreglo[9],arreglo[10],arreglo[11],arreglo[12]];
        var tem3=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4],arreglo[5],arreglo[6]];
        var tem4=[arreglo[6],arreglo[7],arreglo[8],arreglo[9],arreglo[10],arreglo[11],arreglo[12]];
        if(arreglo[5]=="⇔"){  //a13
          return lsl(lslsl(tem1),arreglo[5],lslslsl(tem4));
        }
        if(arreglo[7]=="⇔"){  //b13
          return lsl(lslslsl(tem3),arreglo[7],lslsl(tem2));
        }
      }
      if(largo==15){          //a15
        var tem1=[arreglo[0],arreglo[1],arreglo[2],arreglo[3],arreglo[4],arreglo[5],arreglo[6]];
        var tem2=[arreglo[6],arreglo[7],arreglo[8],arreglo[9],arreglo[10],arreglo[11],arreglo[12]];
        return lsl(lslslsl(tem1),arreglo[7],lslslsl(tem2));
      }
    }

    function Condicional(v1,v2){
      return (!v1)||v2;
    }

    function Bicondicional(v1,v2){
      if(v1==v2) return true;
      else return false;
    }

    var p_a = [];
    var p_c = [];
    function vamos2(arreglo,largo){ //Funcion que agrega a los arreglos de mas arriba
      var bandera = false;
      for(i=0;i<largo;i++){        //las posiciones en donde se encuentran parentesis
        if(arreglo[i]=="("){      //Abiertos y cerrados
          p_a.push(i);
          bandera = true;
        }
        if(arreglo[i]==")"){
          p_c.push(i);
        }
      }
      return bandera;
    }

    function calcula(){ //buscara que parentesis son los mas "cercanos"
      var datos = [1000,1000,1000];
      for (var i = 0; i < p_c.length; i++) {
        for (var j = 0; j < p_a.length; j++) {
          var calcula = p_c[i] - p_a[j];
          if ((calcula < datos[0]) && (calcula > 0)){
              datos[0] = p_c[i] - p_a[j];
              datos[1] = p_a[j] ;
              datos[2] = p_c[i] ;
          }
        }
      }
      return datos;
    }

    function YeriSilva(prop, cLp){
        console.log("entré a YeriSilva");
        var indeterm = false;
        for(i=0; i<=cLp; i++){                     //para todos los elementos de prop
          if(prop[i]=="&&" || prop[i]=="||" || prop[i]=="⇒" || prop[i]=="⇔"){      //cuando encontremos un símbolo
            var yo = 0;   // ocurrencias ∧ ∨
            var cd = 0;   // ocurrencias ⇒
            var bc = 0;   // ocurrencias ⇔
            for(j=i; j<=cLp; j++){               //para todos los elementos de prop, desde el índice siguiente al encontrado recientemente

              if(prop[j]=="&&" || prop[j]=="||"){  //Si encontramos un and o un or
                if(yo<0) yo=0;                    //Aseguramos un solo número para saber cuando hemos evitado una indeterminación
                yo += 1;                          // +1 ocurrencia ∧ ∨
                console.log("&& || encontrado");
                if(yo==2){
                  indeterm = true;
                  break;
                }                  //finalizamos si hay indeterminación
              }
              if(prop[j]=="⇒"){                   //Si encontramos un condicional
                yo -= 1;                          // -1 ocurrencia ∧ ∨
                cd += 1;                          // +1 ocurrencia ⇒
                console.log("⇒ encontrado");
                if(cd==2 && bc != 1){
                  indeterm = true;
                  break;
                }       // salgo del ciclo por indeterminación de dos ⇒ consecutivos sin un ⇔ entremedio
              }
              if(prop[j]=="⇔"){                   //Si encontramos un bicondicional
                yo -= 1;                          // -1 ocurrencia ∧ ∨
                bc += 1;                          // +1 ocurrencia ⇔
                console.log("⇔ encontrado");
                cd -= 1;                          // se impide que la condicional entre en indeterminación
                if(bc==2 && bc != 1){
                  indeterm = true;
                  break;
                }       //Basta con que hayan dos bicondicionales dentro de un mismo paréntesis y se indetermina la expresión
              }
            }      //fin for j
            if(indeterm==false) console.log("Está bien");
            else console.log("encontramos un indeterminado");
            return indeterm;
          }       //fin if de símbolos
        }         //fin for i
      }

    function valor_de_verdad(datos){
      var valor     = false;
      var p_interno = []; //Este sera el arreglo a pasar a la funcion "Vamos"
      /*Armaremos el parentesis para pasarlo de manera correcta a la funcion*/
      for (var i = datos[1]+1; i < datos[2]; i++) {
        p_interno.push(caso13[i]); //Llenando parentesis que entrar a la funcion vamos
      };
      
      var largo = p_interno.length;
      var cont  = 0;
       if(YeriSilva(p_interno,p_interno.length)==true){     // AQUI ESTAMOS VIENDO LA INDETERMINACIÓN DE LA PROPOSICIÓN!!!
        sepuede = false;
       }
      p_interno = negado(p_interno);
      valor     = dentro(p_interno); //Vamos a calcular el valor de verdad
      
      // Realizaremos el reajuste para achicar la proposicion //
      var auxiliar = []; //Aca colocaremos el nuevo arreglo
      for (var i = 0; i < datos[1]; i++) {
        auxiliar.push(caso13[i]);
      }
      auxiliar.push(valor);
      for (var i = datos[2]+1; i < caso13.length; i++) {
          auxiliar.push(caso13[i]);
      }
      caso13 = auxiliar;
    }

    function negado(arreglo){//Cambiara el valor de verdad siempre y cuando exista un negado antes
      var sinnegado = []; //Guardara la posicion de los simbolos negado
      var cont      = 0;
      for (var i = 0; i < arreglo.length; i++) {
        if (arreglo[i]=="~") {
          if(arreglo[i+1]=="~"){
              cont = cont + 1;
          }
          else{
            if (cont%2==0){
              arreglo[i+1] = !eval(arreglo[i+1]);
            }
            cont = 0;
          }
        }
        else{
          sinnegado.push(arreglo[i]);
        }
      }
      console.log(sinnegado);
      return sinnegado;
    }

    //Proposiciones logicas por el borde 
    function resuelve(){ // FUNCION BIG BOSS
      var bandera = true;
      var datos   = [];

      while (bandera) {
        var aux9 = caso13.join();
        aux9 = aux9.replace(/,/g, " ");
        console.log(aux9);
        console.log(caso13);
        $(".desarrollo").append("<div class='row procedimiento'><p id='resolviendo'>"+aux9+"</p></div>")

        bandera = vamos2(caso13,caso13.length);
        if (bandera){
          datos = calcula();
          console.log(datos);
          valor_de_verdad(datos);
        }
        //bandera = false;
        p_c=[];
        p_a=[];
        console.log("\n");
      }
      caso13 = negado(caso13);
      if(YeriSilva(caso13,caso13.length)==true){
        sepuede = false;
      }
      caso13 = dentro(caso13); //En este punto la proposicion ya deberia estar sin parentesis

      if(sepuede==false){
        caso13 = ["Indeterminado"];
      }
      $(".desarrollo").append("<div class='row procedimiento'><p id='resolviendo'>"+caso13+"</p></div>");
    }

    /************************************************************************/
    function pinta(VoF){
      console.log(VoF);
      if(VoF==true)            $("#VoF").html("<p>Verdadero</p>");
      if(VoF==false)           $("#VoF").html("<p>Falso</p>");
      if(VoF=="Indeterminado") $("#VoF").html("<p>Indeterminado</p><br><br><p id='VoFchica'>Jerarquizar mediante paréntesis</p>");
    }

    function LetsDoThat(){
      if(prop[0]!=null){
        var cL1 = 0;
        var cL2 = 0;
        var cLp = prop.length-1;
        console.log(cLp);
        for(i=0; i<=cLp; i++){
          if(prop[i]=="(") cL1+=1;     //cuenta cantidad de paréntesis abiertos
          if(prop[i]==")") cL2+=1;}    //cuenta cantidad de paréntesis cerrados
        if(((cL2==0 && cL1==0) || (cL1/cL2==1)) && (prop[cLp]!="||" && prop[cLp]!="&&" && prop[cLp]!="⇒" && prop[cLp]!="⇔" && prop[cLp]!="∼") ){
          //(si no hay paréntesis o si están cerrados) y (si la proposición no termina en un operador o en negación)
          $(".procedimiento").remove();
          $("#ins1, #ins2, #ins3, #ins4").remove();
          console.log("pasé");
          caso13 = prop;
          resuelve(); //Calculamos el valor de verdad
          console.log("____");
          console.log(caso13);
          pinta(caso13);
        } //fin paso 
      }   //fin existance
    }     //fin funcion LetsDoThat


    function JuegueL(v1,VF){
      if(v1=="P" || v1=="Q" || v1=="R" || v1=="S" || v1=="Z"){  //para p q r s z
        if(v1=="P"){prop.push(VF.p);}
        if(v1=="Q"){prop.push(VF.q);}
        if(v1=="R"){prop.push(VF.r);}
        if(v1=="S"){prop.push(VF.s);}
        if(v1=="Z"){prop.push(VF.z);}
        console.log(prop);
        $(".vL1").attr("disabled","disabled");      //desactivo todos los botones 
        $(".oL").removeAttr("disabled");            //activo V ∧ => <=>
        if(prop.indexOf("(") > -1){                 //si se ha puesto un (
        $(".vL3f").removeAttr("disabled")};         //activo )
        verP.push(v1+" ");
        $("#PLF").html(verP);        //Voy mostrando el valor de la proposición que se está creando
      }

      if(v1=="∼"){                    //negación
        prop.push("∼");
        console.log(prop);
        $(".vL1").attr("disabled","disabled");    //desactivo todos los botones 
        $(".vL3n").removeAttr("disabled");        //activo negado
        $(".habilitado").removeAttr("disabled");  //activo p q r s z
        $(".vL3i").removeAttr("disabled");        //activo (
        verP.push(v1+" ");
        $("#PLF").html(verP);        //Voy mostrando el valor de la proposición que se está creando
      }

      if(v1=="("){                        // (
        prop.push(v1);
        console.log(prop);
        $(".vL3i").removeAttr("disabled");        //activo (
        $(".habilitado").removeAttr("disabled");  //activo p q r s z
        $(".vL3f").attr("disabled","disabled");   //desactivo )
        $(".oL").attr("disabled","disabled");     //desactivo V ∧ => <=>
        verP.push(v1+" ");
        $("#PLF").html(verP);        //Voy mostrando el valor de la proposición que se está creando
      }

      if(v1==")"){                        // )
        prop.push(v1);
        console.log(prop);
        $(".vL1").attr("disabled","disabled");    //desactivo todos los botones
        $(".oL").removeAttr("disabled");          //activo V ∧ => <=>
        $(".vL3f").removeAttr("disabled");        //activo )
        verP.push(v1+" ");
        $("#PLF").html(verP);        //Voy mostrando el valor de la proposición que se está creando
      }

      if(v1=="∨" || v1=="∧" || v1=="⇒" || v1=="⇔"){
        prop.push(v1);
        console.log(prop);
        $(".vL3n").removeAttr("disabled");         //activo negado
        $(".habilitado").removeAttr("disabled");   //activo p q r s z
        $(".vL3i").removeAttr("disabled");         //activo (
        $(".vL3f").attr("disabled","disabled");    //desactivo )
        $(".oL").attr("disabled","disabled");      //desactivo V ∧ => <=>
        verP.push(v1+" ");
        $("#PLF").html(verP);        //Voy mostrando el valor de la proposición que se está creando
      }

     //Cambiares elementos al otro "formato"
      for (var i = 0; i < prop.length; i++) {
        if(prop[i]==true) {prop[i]="true";}
        if(prop[i]==false){prop[i]="false";}
        if(prop[i]=="∧")  {prop[i]="&&";}
        if(prop[i]=="∨")  {prop[i]="||";}
        if(prop[i]=="∼")  {prop[i]="~";}
      }
    }
    var auxPad = 0;
    var contPad = 22;
    function Hola(cant){
      if(cant > auxPad) contPad=contPad - 4;    //ajustes de padding-left
      else contPad=contPad + 4;
      auxPad = cant;
      $("#btnL").css({"padding-left":contPad+"%"});
      console.log(cant);
      
      var pqrsz = ["P","Q","R","S","Z"];
      $(".aL1").remove();
      for(var i=0; i<cant; i++){   //pongo las proposiciones según la cantidad ingresada
        $("#trL1").prepend("<td class='aL1'>"+pqrsz[i]+"</td>");          //id = pV o qV o rV o sV o zV                  id = pF o qF o rF o sF o zF
        $("#trL2").prepend("<td class='aL1' rowspan='2'id='vf"+i+"'><button id='"+pqrsz[i]+"V'>V</button><br><br><button id='"+pqrsz[i]+"F'>F</button></td>");
        $("#btnL").prepend("<button class='aL1 vL1 vL2'>"+pqrsz[i]+"</button>");

      }

    }

    //-------------------------------------------------------- HASTA AQUÍ MÉTODOS Y FUNCIONES ROBERTO ---------------------
    var contInstru2 = 0;
    var coInstru3y4 = 0;
    function Instru2(){
      contInstru2 += 1;
      if(contInstru2 == 2){
        $("#ins1").css({"display":"none"});
        $("#ins2").css({"display":"inline"});
        $("#ins3").css({"display":"none"});
        $("#ins4").css({"display":"none"});
      }
    }
    function Instru3y4(){
      coInstru3y4 += 1;
      if(coInstru3y4==4){
        $("#ins1").css({"display":"none"});
        $("#ins2").css({"display":"none"});
        $("#ins3").css({"display":"inline"});
        $("#ins4").css({"display":"none"});
      }
      if(coInstru3y4==7){
        $("#ins1").css({"display":"none"});
        $("#ins2").css({"display":"none"});
        $("#ins3").css({"display":"none"});
        $("#ins4").css({"display":"inline"});
      }
    }                                             //Mostrar las div correspondientes
    function Inecuaciones(){
      $("#Inecuaciones").css({"display":"inline"});
      $("#Logica").css({"display":"none"});
      $("#Conjuntos").css({"display":"none"});
      $("#ProgLineal").css({"display":"none"});
    }
    function ProgLineal(){
      $("#ProgLineal").css({"display":"inline"});
      $("#Logica").css({"display":"none"});
      $("#Conjuntos").css({"display":"none"});
      $("#Inecuaciones").css({"display":"none"});
    }