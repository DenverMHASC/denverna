<?php echo "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?".">"; ?>

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

<title>Colorado Region of Narcotics Anonymous Edit an Event</title>

<meta name='robots' content='index, nofollow' />

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

?>

	<body>

	<center>

	<div id="wrap">

			<div id="pageheader">

				<img src="../images/cologo.gif" alt="Colorado Region Logo" width="180" height="178" align="left"/>

				<h1>Event Edit Form</h1>

			</div>

			<?php

			if(!$_POST)

			{

				$sql = "SELECT event_id,event_name,event_date FROM events Order by event_name ASC";

				$results = mysql_query($sql) or die('Bad Query');

				$num_results = mysql_num_rows($results);

				?>

				<div id="eventbody">

					<span class="instructions">

					<strong>To Start:</strong><br />

      				Select the event you wish to edit from the list below, enter your e-mail 

				  	address, and pass phrase and click the &quot;Get Information for this Event&quot; button. </span> 

				  	

				  	<form action="event_edit.php" method="post" enctype="application/x-www-form-urlencoded" name="get_event" class="eventedit">

					<strong>Events:</strong><br />

					<select name="event_name" size="10">

					<?php

					 	while($row = mysql_fetch_array($results))

						{

							echo "<option value='";

							echo $row[0];

							echo "'>";

							echo $row[1]." - ".$row[2];

							echo "</option>\n";		

						}	

					?>

					</select><br />

        			<strong>e-mail address you used when you added this event:</strong><br />

					<input name="user" type="text" size="80" maxlength="100" /><br />

        			<strong>Password you used when you added this event:</strong><br />

					<input name="pass" type="text" size="80" maxlength="100" /><br /><br />

					<input name="submit" type="submit" value="Get Information for this Event &gt;&gt;" class="eventbutton" />

					</form>

				</div>

			<?php

			} else {

				// Get Entered values and check for record

				$event_id = $_POST['event_name'];

				$user = $_POST['user'];

				$pass = $_POST['pass'];

				$sql ="SELECT * FROM `events` WHERE event_id ='".$event_id."' AND add_user ='".$user."' AND pass_phrase = ENCRYPT('".$pass."','".getKey()."')";

				$results = mysql_query($sql) or die('Sorry, you have entered incorrect information.Please use browser back button and try again');

				$row=mysql_fetch_array($results);

				$our_date = formatDate($row['event_date']);

				?>

				<div id="pagebody">

				<form action="event_update.php" method="post" enctype="application/x-www-form-urlencoded" name="edit" class="submission">

				<table width='90%'>

       			<caption><strong>Information for: <?php echo $row['event_name'] ?> on <?php echo date('M d, Y',$our_date) ?></strong></caption> 

      			<tr><td align="center">Current</td><td align="center">New</td></tr>

				<tr><td width="40%"><?php echo $row['event_name'] ?></td><td><input name="event_name" type="text" size="40" /></td></tr>			

				<tr><td><?php echo date('M d, Y',$our_date) ?></td><td>Month: <?php monthBox(start_month) ?>&nbsp;Date: <?php dayBox(start_day) ?>&nbsp;Year: 20<input name="start_year" type="text" size="2" maxlength="2" /></td></tr>

				<tr><td>Start Time:&nbsp;<?php formatTime($row['start_time']) ?></td><td><input name="start_hour" type="text" size="2" /><strong> : </strong><input name="start_min" type="text" value="00" size="2" />&nbsp;<label>AM</label><input type="radio" name="start_divide" value="am" /><label> PM</label><input type="radio" name="start_divide" value="pm" /></td></tr>

				<tr><td>End Time:&nbsp;<?php formatTime($row['end_time']) ?></td><td><input name="end_hour" type="text" size="2" /><strong> : </strong><input name="end_min" type="text" value="00" size="2" />&nbsp;<label>AM</label><input type="radio" name="end_divide" value="am" /><label> PM</label><input type="radio" name="end_divide" value="pm" /></td></tr>

				<tr><td><?php writeLocationName($row['location_name']) ?></td><td><input name="location_name" type="text" size="40" /></td></tr>

				<tr><td><?php echo $row['location_street'] ?></td><td><input name="location_street" type="text" size="40" /></td></tr>

				<tr><td><?php echo $row['location_city'] ?></td><td><input name="location_city" type="text" size="40" /></td></tr>

				<tr><td><?php writeDetails(stripslashes($row['details'])) ?></td><td><textarea name="details" cols="33" rows="5"></textarea></td></tr>

				<tr><td><?php writeFlyer($row['flyer_loc']) ?></td><td>http://<input name="flyer_loc" type="text" size="33" maxlength="100" /></td></tr>

				<tr><td colspan="2" align="center"><input name="event_id" type="hidden" value="<?php echo $row['event_id'] ?>" />Check this box to use this event as a template<input name="make_copy" type="checkbox" value="y" /></td></tr>

				<tr><td align="center"><input name="" type="reset" value="Clear this form and start over!"  class="eventbutton" /></td><td align="center"><input name="submit" type="submit" value="Process Changes" class="eventbutton" /></td></tr>

				</table>

				</form>

				</div>

				<?php

			}

			?>

	  		<div id="footer"><a href="../index.php" class="Backlink">Return To Colorado Region Home Page</a><br />

				<a href="http://validator.w3.org/check?uri=referer">

				<img src="http://www.w3.org/Icons/valid-xhtml10" alt="Valid XHTML 1.0!" width="88" height="31" border="none" /></a>

				<a href="http://jigsaw.w3.org/css-validator/"><img style="border:none;width:88px;height:31px" src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS!" /></a><br />

				<p style="float:left;clear:both;width:100%; margin:auto; ">This page was last modified on: <?php echo date('F d, Y',filemtime(basename($_SERVER['PHP_SELF']))) ?></p>

			</div>

	</div>

	</center>

	</body>

</html>

<?php	

}







