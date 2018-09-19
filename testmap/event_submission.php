<?php 

if($_SERVER['HTTP_REFERER'] != "http://www.nacolorado.org/events/event_add.php")

	header("Location:../");

if(strstr($_POST['event_name'],'http'))

	header("Location:../");

if(eregi("a href=",stripslashes($_POST['event_detail'])))

	header("Location:../");

if(strstr($_POST['domain'],"host119.ipowerweb.com"))

	header("Location:../");

if(strstr($_POST['loc_name'],'http'))

	header("Location:../");

if(strstr($_POST['event_addr'],'http'))

	header("Location:../");

if(strstr($_POST['event_city'],'http'))

	header("Location:../");

if(strstr($_POST['poster_name'],'http'))

	header("Location:../");

if(!eregi('.',$_POST['domain']))

	header("Location:../");

if($_POST['start_year'] == "none")

	header("Location:../");	

if(!gethostbynamel($_POST['domain']))

	header("Location:../");

$now = mktime();

$then = mktime(0,0,0,$_POST['start_day'],$_POST['start_month'],$_POST['start_year']);

if($then <= $now)

	header("Location:../");	

require_once('../.scripts/nacolorado_functions.inc.php');

require_once('../.scripts/nacolorado_page_writer.php');

require_once('s/prevent.php');

if(bannedIP())

	header("Location:../");

if(checkForNulls($_POST))

{

	// give an honest user a break and let them have another chance

	?>

	<script language="javascript" type="text/javascript">

		history.back();

	</script>

	<noscript>

	<?php 

		header("Location:".$_SERVER['HTTP_REFERER']); 

	?>

	</noscript>

	<?php

}	

$data = array();

$data = processEvent();

if(isset($data['display']))

	$title = " Problem";

else

	$title = " Success";

$dots = "../";

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">

<head>

<title>COLORADO REGION OF NARCOTICS ANONYMOUS:Event Submission<?php echo $title ?></title>

<meta name='robots' content='noindex,nofollow' />

<link href="../nacolorado.css" rel="stylesheet" type="text/css" />

</head>

	<body>

	<div id="wrap">

		<?php writeNav(basename($_SERVER['PHP_SELF']),$dots) ?>

		<?php writePageHeader("Event Submission".$title,$dots) ?>

		</div>

		<div id="pagebody">

		<?php

		if(isset($data['display']))

		{

		?>

			<h3>There was an error processing your request.<br />

			Please use your browser's back button to make corrections and resubmit.<br />

			Thank you for your continued patience.</h3>

		<?php

		}else{

		?>

			The following information has been submitted:<br />

			Event Name:<?php echo stripslashes($data['event_name']); ?><br />

			Event Time:<?php echo $data['start_time']." on ".$data['start_date']." to ".$data['end_time']." on ".$data['end_date'] ?><br />

			Location:<?php echo $data['loc_name']." ".stripslashes($data['event_addr']).", ".$data['event_city'] ?><br />

			Additional Details: <?php echo $data['event_detail'] ?><br />

			Web information at: <?php echo $data['flyer'] ?><br />

			By: <?php echo $data['poster_name']; ?>

			on: <?php echo date('m/d/Y');

		}

		?></div><?php writeFooter($dots) ?>

	</div>

</body>

</html>

