$(document).ready(Principal);
  function Principal(){
  	$( "#RF" ).hover( //REGION FACTIBLE
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).hide();
	    $( "#img_fcionobj" ).hide();  $( "#img_max" ).hide();
	    $( "#img_min" ).hide();       $( "#img_ptscrit" ).hide();
	    $( "#img_regfact" ).show();   $( "#img_restric" ).hide();
	  }
	);

	$( "#PC" ).hover( //PUNTOS CRITICOS
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).hide();
	    $( "#img_fcionobj" ).hide();  $( "#img_max" ).hide();
	    $( "#img_min" ).hide();       $( "#img_ptscrit" ).show();
	    $( "#img_regfact" ).hide();   $( "#img_restric" ).hide();
	  }
	);

	$( "#FO" ).hover( //FUNCION OBJETIVO
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).hide();
	    $( "#img_fcionobj" ).show();  $( "#img_max" ).hide();
	    $( "#img_min" ).hide();       $( "#img_ptscrit" ).hide();
	    $( "#img_regfact" ).hide();   $( "#img_restric" ).hide();
	  }
	);

	$( "#RE" ).hover( //RESTRICCIONES
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).hide();
	    $( "#img_fcionobj" ).hide();  $( "#img_max" ).hide();
	    $( "#img_min" ).hide();       $( "#img_ptscrit" ).hide();
	    $( "#img_regfact" ).hide();   $( "#img_restric" ).show();
	  }
	);

	$( "#EVA" ).hover( //EVALUACION
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).show();
	    $( "#img_fcionobj" ).hide();  $( "#img_max" ).hide();
	    $( "#img_min" ).hide();       $( "#img_ptscrit" ).hide();
	    $( "#img_regfact" ).hide();   $( "#img_restric" ).hide();
	  }
	);

	$( "#MA" ).hover( //MAXIMACION
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).hide();
	    $( "#img_fcionobj" ).hide();  $( "#img_max" ).show();
	    $( "#img_min" ).hide();       $( "#img_ptscrit" ).hide();
	    $( "#img_regfact" ).hide();   $( "#img_restric" ).hide();
	  }
	);

	$( "#MI" ).hover( //MINIMIZACION
	  function() {
	    $( "#img_inicio" ).hide();    $( "#img_evaluacion" ).hide();
	    $( "#img_fcionobj" ).hide();  $( "#img_max" ).hide();
	    $( "#img_min" ).show();       $( "#img_ptscrit" ).hide();
	    $( "#img_regfact" ).hide();   $( "#img_restric" ).hide();
	  }
	);

	/*****************FUNCION LINEAL****************/
  	$( "#m_cre" ).hover( //Fcion Creciente
	  function() {
	    $( "#creciente" ).show();    $( "#decreciente" ).hide();  $( "#constante" ).hide(); 
	    $( "#m_inicial" ).hide(); 
	  }
	);

	$( "#m_dec" ).hover( //Fcion Creciente
	  function() {
	    $( "#creciente" ).hide();    $( "#decreciente" ).show();  $( "#constante" ).hide();  
	  	$( "#m_inicial" ).hide();
	  }
	);

	$( "#m_con" ).hover( //Fcion Creciente
	  function() {
	    $( "#creciente" ).hide();    $( "#decreciente" ).hide();  $( "#constante" ).show();  
	  	$( "#m_inicial" ).hide();
	  }
	);
  }