<?php

if(basename($_SERVER['PHP_SELF']) =='index.php')

	$home = true;

require_once("../.scripts/nacolorado_functions.inc.php");

require_once("../.scripts/nacolorado_page_writer.php");

require_once("../.scripts/meeting_functions.inc.php");

$dots = "../";

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">

<head>

<title>COLORADO REGION OF NARCOTICS ANONYMOUS: Add Your Event</title>

<meta name='robots' content='index, nofollow' />

<link href="../nacolorado.css" rel="stylesheet" type="text/css" />

<script language='JavaScript' src='../nacolorado.js' type='text/javascript'>

</script>

</head>

<body>

	<div id="wrap">

		<?php writeNav(basename($_SERVER['PHP_SELF']),$dots) ?>

		<?php writePageHeader("Add an Event to the Colorado Regional Events Calendar",$dots) ?>

</div>

		<div id="pagebody">

			<p style="font-weight:bold ">

			Please use this form to submit event or Regional Committee or Sub-Committee meeting information 

			only. Please DO NOT use this for regular meeting information. We need complete 

			information in order to post the event. Incomplete information will be sent 

			back for revision.<br /> <span class="formlegend"> 

			Data Entry Fields marked with <img src= "../images/cologoplain.gif" alt="required" width="40" height="39" /> 

			 are required<br />

			Please do not use any quotes (' or ") in any data entry fields</span>

			</p>

			<form action="event_submission.php" method="post" enctype="application/x-www-form-urlencoded" onsubmit= 'return checkMe(this.document)'>

				<table style="width:75%;margin:auto;" class="submission">

					<tr>

					<td colspan="2"><span class="formlegend">Is this a group or area event?</span></td>

					</tr>

					<tr>

					<td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td> 

					Enter Your Group Name: <input name="group" type="text" size="40" maxlength="100" /><br />

					AND<br />

					Choose Your Area: <select name="area">

					<option value='0' selected='selected'>Choose One</option>

					<?php

					dbConnect($db);

					$sql = "SELECT * from areas ORDER by area_id ASC";

					$results = mysql_query($sql);

					while($row = mysql_fetch_array($results))

					echo "<option value ='".$row['area_id']."'>".$row['area_name']."</option>\n";

					?></select>

					</td></tr> 

					<tr>

					<td colspan="2"><span class="formlegend">Enter Event Information</span></td>

					</tr>

					<tr>

					<td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td>Event Name: (this is how you want your event displayed on the events calendar)<br />

					<input name="event_name" type="text" size="80" maxlength="100" /></td>

					</tr>

					<tr>

					<td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td>Event Date:<br />

					Month: <?php monthBox(start_month) ?>&nbsp;Date: <?php dayBox(start_day) ?>&nbsp;Year: 

					<select name="start_year">

					<option value="none" selected="selected">Choose Year</option>

					<?php

						$year = date('Y');

						for ($i = 0; $i < 5; $i++)

						{

							echo "<option value='".$year."'>".$year."</option>\n";

							$year++;

						}					

					?>

					</select><br />

					<input name="more_than_one" type="checkbox" value="y" /> This event lasts more than one day and lasts <input name="num_days" type="text" size="2" maxlength="2" /> days.

					</td>

					</tr>

					<tr>

            		<td colspan="2" align="center"> <span class="instructions">If your 

              		event lasts more than one day<br />

              		For example: a campout starting on Friday and ending on Sun - CHECK 

              		the box above and enter 3 as the number of days this event lasts. <br />

					Enter the start time for the first day in start time fields below and the end time for the last day in the end time fields below.<br />

					If your event starts at night and ends the next morning - DO NOT CHECK the box above, but ensure your start and end times reflect the scheduled start and end times<br />

					For example: a dance starting at 8 PM on Friday night and ending at 1 AM Saturday Morning should be entered as start time 8:00 PM and end time 1:00AM.<br />

					Start and End Time entries:<br />

					For example if 7:30 PM is your desired 

					time entry:<br />

					Type 7 in the first box<br />

					Type 30 in the second box<br />

					And choose PM</span>

					</td></tr>

					<tr>

					<td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td>

					<hr />

					Start Time: 

					<input name="start_hour" type="text" size="2" /><strong> : </strong><input name="start_min" type="text" value="00" size="2" />

					<label>AM</label><input type="radio" name="start_divide" value="am" /><label> PM</label><input type="radio" name="start_divide" value="pm" checked='checked' /><br />

					End Time:&nbsp;&nbsp;<input name="end_hour" type="text" size="2" /><strong> : </strong><input name="end_min" type="text" value="00" size="2" />

					<label>AM</label><input type="radio" name="end_divide" value="am" /><label> PM</label><input type="radio" name="end_divide" value="pm" checked='checked' />

					</td>

					</tr>

					<tr>

					<td colspan="2"><span class="formlegend">Event Location Information</span></td>



					</tr>

					<tr>

					<td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td>Location Name (for example Just for Today Club):

					<input name="loc_name" type="text" size="80" maxlength="100" /><br />

              		Street Address:<br />

					<input name="event_addr" type="text" size="80" maxlength="100" /><br />

					City<br />

					<input name="event_city" type="text" size="80" maxlength="100" />

					</td>

					</tr>

					<tr>

					<td colspan="2"><span class="formlegend">Other Information</span></td>

					</tr>

					<tr>

					<td>&nbsp;</td>

					<td>Other Information:<br />

					In the Field Below please enter any other information you wish to include.<br />

					This information will be displayed as your event detail until a flyer or website is posted.<br />

					html tags are not allowed in this field.<br />

					<textarea name="event_detail" cols="50" rows="10"></textarea><br />

					Flyer or Web location of your event:<br />

					<strong>http://</strong><input name="flyer_loc" type="text" size="70" maxlength="100" />

					</td>

					</tr>

					<tr><td colspan="2"><span class="formlegend">Your Information</span></td></tr>

					<tr><td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td>

					Your Name (First Name and Last Initial Only please):<br />

					<input name="poster_name" type="text" size="80" /><br /></td></tr>

					<tr><td colspan="2" align="center">

					<span class="instructions">In the first box enter everything to the left of the "@" symbol<br />

					In the second box enter everything to the right of the "@" symbol.<br />

					for example: if your e-mail address is "no.one@no_domain.com"<br />

					enter "no.one" in the first box below<br />

					and<br />

					"no_domain.com" in the second box.					

					</span></td></tr>

					<tr><td><img src="../images/cologoplain.gif" alt="required" /></td>

					<td>Your e-mail address:<br />

					<input name="user" type="text" size="35" maxlength="50" /><strong>&nbsp;@&nbsp;</strong><input name="domain" type="text" size="40" maxlength="50" /><br />

					Your Password (so you can edit this event in the future):<br />

					<input name="pass_phrase" type="text" size="80" maxlength="100" />

					</td>

					</tr>

					<tr>

					<td colspan="2"><span class="formlegend"> 

					<input name="submit" type="submit" value="Add This Event" class="eventbutton" />

					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 

					<input name="reset" type="reset" value="Clear This Form and Start Over!" class="eventbutton" />

					</span></td>

					</tr>

			</table>

		</div>

		<?php writeFooter($dots) ?>

	</div>

</body>

</html>