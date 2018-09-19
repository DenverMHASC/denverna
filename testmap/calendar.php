<?php



if(basename($_SERVER['PHP_SELF']) =='index.php')



	$home = true;



require_once("../.scripts/nacolorado_functions.inc.php");



require_once("../.scripts/nacolorado_page_writer.php");



require_once("../.scripts/meeting_functions.inc.php");



require_once('Calendar_class.php');

$dots = "../../";

?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">



<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">



<head>



<title>COLORADO REGION OF NARCOTICS ANONYMOUS:Events Calander</title>



<meta name='robots' content='index,follow' />



<link href="../nacolorado.css" rel="stylesheet" type="text/css" />



<script language='JavaScript' src='../nacolorado.js' type='text/javascript'>\n" ?>



</script>



</head>



<body>



	<div id="wrap">



		<?php writeNav(basename($_SERVER['PHP_SELF']),$dots) ?>



		<?php writePageHeader("Colorado Region of Narcotics Anonymous Events Calendar",$dots) ?>



		</div>



		<div id="eventbody" align="center">



		<?php



			writeBody();



?>



<?php



function writeBody(){



$curr_year = date("Y");



$curr_month = date("m");



?>



 <h3 style="text-align:center " class="clean">Click on any Event Name Below to see Event details!</h3>



<?php 



if ($_POST)



{



	$cal = new Calendar; 



	echo $cal->getMonthView($_POST['month'],$_POST['year']);



}	



else



{	



	$cal = new Calendar; 



	echo $cal->getCurrentMonthView($curr_month,$curr_year);



}



	?>



	<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#110;&#97;&#99;&#111;&#108;&#111;&#114;&#97;&#100;&#111;&#64;&#110;&#97;&#99;&#111;&#108;&#111;&#114;&#97;&#100;&#111;&#46;&#111;&#114;&#103;"class="Backlink">&#67;&#108;&#105;&#99;&#107;&#32;&#104;&#101;&#114;&#101;&#32;&#105;&#102;&#32;&#121;&#111;&#117;&#114;&#32;&#69;&#118;&#101;&#110;&#116;&#32;&#105;&#115;&#32;&#110;&#111;&#116;&#32;&#115;&#104;&#111;&#119;&#110;</a><br />



	<a href="event_add.php"class="Backlink">Click Here to Add Your Event</a><br />



	<a href="event_edit.php" class="Backlink">Click Here to Edit an Existing Event</a><br />



	<?php



	echo "</div>\n";



 	writeFooter($dots);



}



?>