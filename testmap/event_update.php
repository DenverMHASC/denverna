<?php

if(!$_POST)

	header("Location:event_edit.php");

if(!strstr($_SERVER['HTTP_REFERER'],"event_edit.php"))

	header("Location:event_edit.php");

echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?".">"; ?>

<?php

require_once('../.scripts/nacolorado_functions.inc.php');

require_once('../.scripts/events_functions.inc.php');

writeHeader();

writeBody();

function writeHeader()

{

	echo "<?xml version='1.0' encoding='iso-8859-1'?>"; 

	echo "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>\n";

	?> 

	<html xmlns="http://www.w3.org/1999/xhtml">

	<head>

	<title>Colorado Region of Narcotics Anonymous Event Update Success</title>

	<link href="../nacolorado.css" rel="stylesheet" type="text/css" />

	<script language='JavaScript' src='../nacolorado.js' type='text/javascript'>

	</script>

	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

	</head>

	<?php

}

function writeBody()

{

	dbConnect($db);

	$id = $_POST[event_id];

	$sql = "SELECT * FROM events where event_id ='".$id."'";

	$results = mysql_query($sql) or die('Should Never See This');

	$num_results = mysql_num_rows($results);

	$current = mysql_fetch_array($results);

	$num_fields = mysql_num_fields($results);

	$make_copy = $_POST['make_copy'];

	switch($make_copy)

	{

		case 'y':

		$insert = "INSERT INTO events VALUES(NULL,";

		for($i =1; $i < $num_fields;$i++)

			$insert .= "'".$current[$i]."',";

		$insert = removeLastComma($insert);

		$insert .=")";

		$copy_results = mysql_query($insert) or die ('Cannot Insert Data');

		$id = mysql_insert_id();

		$results = mysql_query($sql) or die('Should Never See This');

		$current = mysql_fetch_array($results);

		$update = "UPDATE events SET";

		break;

		

		default:

		$update = "UPDATE events SET";

	}

	// Check for and format Date and Time Fields

	if($_POST['end_divide'] == 'pm' && $_POST['end_hour'] < 12 && $_POST['end_hour'] != '00')

		$_POST['end_hour'] = $_POST['end_hour'] + 12;

	if($_POST['start_divide'] == 'pm' && $_POST['start_hour'] < 12 && $_POST['start_hour'] != '00')

		$_POST['start_hour'] = $_POST['start_hour'] + 12;

		

	if($_POST['start_hour'] != getHour($current['start_time']) || $_POST['start_min'] != getMin($current['start_time']))

	{

		$start_time = strftime('%R',mktime($_POST['start_hour'],$_POST['start_min'],0,1,1,1980));

		$print_start = strftime('%r',mktime($_POST['start_hour'],$_POST['start_min'],0,1,1,1980));

		$update .=" events.start_time='".$start_time."',";

		$msg .="New Start Time: ".$print_start."<br />";

	}

	if($_POST['end_hour'] != getHour($current['end_time']) || $_POST['end_min'] != getMin($current['end_time']))

	{

		$end_time = strftime('%R',mktime($_POST['end_hour'],$_POST['end_min'],0,1,1,1980));

		$print_end =  strftime('%r',mktime($_POST['end_hour'],$_POST['end_min'],0,1,1,1980));

		$update .=" events.end_time='".$end_time."',";

		$msg .="New End Time: ".$print_end."<br />";

	}

	if($_POST['start_month'] != getMonth($current['event_date']) || $_POST['start_day'] != getDay($current['event_date']) || "20".$_POST['start_year'] != getYear($current['event_date']))

	{

		$_POST['start_year']  = "20".$_POST['start_year'];

		$event_date_str = mktime($_POST['end_hour'],$_POST['end_min'],0,$_POST['start_month'],$_POST['start_day'],$_POST['start_year']);

		$event_date = date('Y-m-d',$event_date_str);

		$print_date = date('M d, Y',$event_date_str);

		$update .=" events.event_date='".$event_date."',";

		$msg .="New Date: ".$event_date."<br />";

		if($current['event_date'] == $current['end_date'])

		{

			$update .=" events.end_date='".$event_date."',";

		}

	}

	// Check for fields to update and start writing the sql string

	foreach (array_keys($_POST) as $key)

	 {

	 	if($_POST[$key] != '00' && $_POST[$key] != NULL)

		{

			$$key = $_POST[$key];

			if("$key" == 'start_hour' || "$key" == 'start_min' || "$key" == 'start_divide')

				continue;

			if("$key" == 'end_hour' || "$key" == 'end_min' || "$key" == 'end_divide')

				continue;

			if("$key" == 'start_month' || "$key" == 'start_day' || "$key" == 'start_year')

				continue;

			if("$key" == 'event_id')

				continue;

			if("$key" == 'submit')

				continue;

			if("$key" == 'make_copy')

				continue;

			if("$key" == 'flyer_loc')

			{

				$flyer ="http://".$_POST['flyer_loc'];;

				$update .= " events.flyer_loc ='".$flyer."', ";

				$msg .="New Web Flyer Location = ".$flyer."<br />";

				continue;

			}

			$update .=" events.".$key."='"."${$key}"."',";

			$msg .="New ".$key." = ${$key}<br />";

		}

	}

	if ($update != 'UPDATE events SET')

	{

		$update .= " edit_date=NOW()";

		if($make_copy = 'y')

			$update .=" WHERE event_id ='".$id."'";

		else

			$update .=" WHERE event_id ='".$_POST['event_id']."'";

		$insert = mysql_query($update) or die('Event not Updated');

		$msg ="<left><b>".$msg."</b></left>";

	} 

	else

		$msg = '<center><b>NO CHANGES MADE</b></center>';

	?>

	<body>

		<center>

		<div id='wrap'>

				<div id="pageheader">

				<img src="../images/cologo.gif" alt="Colorado Region Logo" width="180" height="178" align="left"/>

				<h1>Event Information Changes Submitted</h1>

			</div>

				<div id="pagebody">

					<?php

						echo $msg;

					?>

				</div>

				<div id="footer">

					<a href="calendar.php" class="Backlink">Events Calendar</a><br />

					<a href="event_add.php"class="Backlink">Click Here to Add Your Event</a><br />

					<a href="event_edit.php" class="Backlink">Click Here to Edit an Existing Event</a><br /><a href="../index.php" class="Backlink">Return To Colorado Region Home Page</a><br />

					<p style="float:left;clear:both;width:100%; margin:auto; ">This page was last modified on: <?php echo date('F d, Y',filemtime(basename($_SERVER['PHP_SELF']))) ?></p>

			</div>

		</div>

		</center>

	</body>

	</html>

	<?php

}

?>