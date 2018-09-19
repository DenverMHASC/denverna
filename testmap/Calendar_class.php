<?php

// Nacolorado Events Calendar Class function version 1.0

// based on PHP Calendar Class Version 1.4 (5th March 2001)

// by David Wilkinson 2000 - 2001. 

//

// Copyright Don T CRCSNA Web Servant May 2004 All Rights Reserved.

// This software may be used, modified and distributed freely

// providing this copyright notice remains intact at the head 

// of the file.

//

// This software is freeware. The author accepts no liability for

// any loss or damages whatsoever incurred directly or indirectly 

// from the use of this script. The author of this software makes 

// no claims as to its fitness for any purpose whatsoever. If you 

// wish to use this software you should first satisfy yourself that 

// it meets your requirements.

//

// URL:   http://www.nacolorado.org/events/CalenDar_class.php

// Email: nacolorado@nacolorado.org

require_once('../.scripts/nacolorado_functions.inc.php');

class Calendar

{

    /*

        Constructor for the Calendar class

    */

    function Calendar()

    {

    }

    

    

    /*

        Get the array of strings used to label the days of the week. This array contains seven 

        elements, one for each day of the week. The first entry in this array represents Sunday. 

    */

    function getDayNames()

    {

        return $this->dayNames;

    }

    



    /*

        Set the array of strings used to label the days of the week. This array must contain seven 

        elements, one for each day of the week. The first entry in this array represents Sunday. 

    */

    function setDayNames($names)

    {

        $this->dayNames = $names;

    }

    

    /*

        Get the array of strings used to label the months of the year. This array contains twelve 

        elements, one for each month of the year. The first entry in this array represents January. 

    */

    function getMonthNames()

    {

        return $this->monthNames;

    }

    

    /*

        Set the array of strings used to label the months of the year. This array must contain twelve 

        elements, one for each month of the year. The first entry in this array represents January. 

    */

    function setMonthNames($names)

    {

        $this->monthNames = $names;

    }

   

    /* 

        Gets the start day of the week. This is the day that appears in the first column

        of the calendar. Sunday = 0.

    */

      function getStartDay()

    {

        return $this->startDay;

    }

    

    /* 

        Sets the start day of the week. This is the day that appears in the first column

        of the calendar. Sunday = 0.

    */

    function setStartDay($day)

    {

        $this->startDay = $day;

    }

    

    

    /*

        Return the HTML for the current month

    */

    function getCurrentMonthView($month,$year)

    {

        $d = getdate(time());

        return $this->getMonthView($d["mon"], $d["year"]);

    }

    

    /*

        Return the HTML for a specified month

    */

    function getMonthView($month, $year)

    {

		return $this->getMonthHTML($month, $year);

    }

	

    /********************************************************************************

    

        The rest are private methods. No user-servicable parts inside.

        

        You shouldn't need to call any of these functions directly.

        

    *********************************************************************************/





    /*

        Calculate the number of days in a month, taking into account leap years.

    */

    function getDaysInMonth($month, $year)

    {

        if ($month < 1 || $month > 12)

        {

            return 0;

        }

   

        $d = $this->daysInMonth[$month - 1];

   

        if ($month == 2)

        {

            // Check for leap year

            // Forget the 4000 rule, I doubt I'll be around then...

        

            if ($year%4 == 0)

            {

                if ($year%100 == 0)

                {

                    if ($year%400 == 0)

                    {

                        $d = 29;

                    }

                }

                else

                {

                    $d = 29;

                }

            }

        }

    

        return $d;

    }





    /*

        Generate the HTML for a given month

    */

    function getMonthHTML($m, $y, $showYear = 1)

    {

        $s = "";

        $a = $this->adjustDate($m, $y);

        $month = $a[0];

        $year = $a[1];        

        

    	$daysInMonth = $this->getDaysInMonth($month, $year);

    	$date = getdate(mktime(12, 0, 0, $month, 1, $year));

//fix the month to include a zero for date comparisons

		if($month < 10)

			$fixmonth = '0'.$month;

		else

			$fixmonth = $month;

		$firstdate = $year.'-'.$fixmonth.'-01';

		$lastdate = $year.'-'.$fixmonth.'-'.$daysInMonth;

 // Connect to the database and get the events for this month 

        dbConnect($db);

		$sql = "SELECT * , area_name FROM events, areas WHERE events.area_id = areas.area_id AND (event_date >='".$firstdate."' AND event_date <= '".$lastdate."')ORDER BY event_date, start_time ASC";

		$results = mysql_query($sql) or die($sql);

		$num_results = mysql_num_rows($results);

		$events[$num_results][mysql_num_fields($results)];

		$j = 0;

		while ($row = mysql_fetch_array($results))

		 {

		 	for($i = 0; $i < mysql_num_fields($results);$i++)

			{

				$events[$j][mysql_field_name($results,$i)] = $row[$i];

			}

			$j++;

		 }

		$row_id = 0;		

		$first = $date["wday"];

		$monthName = $this->monthNames[$month - 1];

     	$header ="Events for ".$monthName . (($showYear > 0) ? " " . $year : "");

        ?>

		<table width="75%" id="calendar" align="center" cellpadding="0">

		<tr id='title'>

		<th>

		<?php

		$prev_month = $this ->adjustDate($month - 1,$year);

		foreach($prev_month as $dateinfo)

			{

			if ($dateinfo <= 12)

			{

				$myMonthName = $this ->monthNames[$dateinfo-1];

				$myMonth = $dateinfo;

			}

			else

				$myYear = $dateinfo;				

			}

		?>

		<form action="calendar.php" method="post" enctype="application/x-www-form-urlencoded">

		<input name='month' type='hidden' value='<?php echo $myMonth ?>' />

		<input name='year' type='hidden' value='<?php echo $myYear ?>' />

		<br />

		<input name='submit'  class='nav'type='submit' value=' <?php echo '&lt;&lt;' .$myMonthName ?>' />

		</form>

		</th>

    	<th colspan="5" class="info"><?php echo $header ?></th> 

		<th>

		<?php

		$next_month = $this ->adjustDate($month + 1,$year);

		foreach($next_month as $dateinfo)

			{

			if ($dateinfo <= 12)

			{

				$myMonthName = $this ->monthNames[$dateinfo-1];

				$myMonth = $dateinfo;

			}

			else

				$myYear = $dateinfo;				

			}

		?>

		<form action="calendar.php" method="post" enctype="application/x-www-form-urlencoded">

		<input name='month' type='hidden' value='<?php echo $myMonth ?>' />

		<input name='year' type='hidden' value='<?php echo $myYear ?>' />

		<br />

		<input name='submit'  class='nav'type='submit' value='<?php echo $myMonthName.'&nbsp;&gt;&gt;' ?>' />

		</form>

		</th>

    	</tr>

    	<?php	

    	$s .= "<tr class='days' >\n";

		for ($i = 0 ;$i < 7 ;$i++)

    	$s .= "<th width='14%'>" . $this->dayNames[($this->startDay +$i)%7] . "</th>\n";

    	$s .= "</tr>\n";    	

    	// We need to work out what date to start at so that the first appears in the correct column

    	$d = $this->startDay + 1 - $first;

    	while ($d > 1)

    	{

    	    $d -= 7;

    	}



        // Make sure we know when today is, so that we can use a different CSS style

        $today = getdate(time());

    		

    	while ($d <= $daysInMonth)

    	{

    	    $s .= "<tr class='days'>\n";       

    	    

    	    for ($i = 0; $i < 7; $i++)

    	    {

        	    $s .= "<td class='days'";

				if($d == $today['mday'] && $month == $today['mon'] && $year == $today['year'] )

					$s.= " class='today'";

				$s .= ">" ;

    	        if ($d > 0 && $d <= $daysInMonth)

    	        {

      	            $s .= "<span class='date'>".$d."</span>"."<br />";

// look for events to display on this date

					//fix the date to include a zero for date comparison

					if ($d < 10)

						$thisdate = $year.'-'.$fixmonth.'-0'.$d;

					else

						$thisdate = $year.'-'.$fixmonth.'-'.$d;

					// compare dates to see if we have an event today

					if($thisdate == $events[$row_id]['event_date'])

					{

						$num_events = 1;

						while($thisdate == $events[$row_id]['event_date'])

						{

							if ($num_events > 1)

								$s .="<hr />\n";

							if ($events[$row_id]['flyer_loc'] != NULL)

								$s .="<span class='tinyinfo'><a href ='".$events[$row_id]['flyer_loc']."' target ='_blank' class='tinyinfo'>".$events[$row_id]['event_name']."</a><br /></span>\n";

							else

								$s .="<span class='tinyinfo'><a href ='JavaScript:EventDetail(".$this->writeJavascript($events[$row_id]).")'class ='tinyinfo'>".$events[$row_id]['event_name']."</a><br /></span>\n";

							$row_id++;

							$num_events++;

						}

					}

					// otherwise write the a blank calendar day

					else

						$s .= "<img src='../images/spaced.gif' width='1' height='30' alt ='this is a spacer' />";

    	        }

    	        else

    	        {

    	            $s .= "&nbsp;";

    	        }

      	        $s .= "</td>\n";       

        	    $d++;

    	    }

    	    $s .= "</tr>\n";    

    	}

    	

    	$s .= "</table>\n";

    	

    	return $s;  	

    }

   

    /*

        Adjust dates to allow months > 12 and < 0. Just adjust the years appropriately.

        e.g. Month 14 of the year 2001 is actually month 2 of year 2002.

    */

    function adjustDate($month, $year)

    {

        $a = array();  

        $a[0] = $month;

        $a[1] = $year;

        

        while ($a[0] > 12)

        {

            $a[0] -= 12;

            $a[1]++;

        }

        

        while ($a[0] <= 0)

        {

            $a[0] += 12;

            $a[1]--;

        }

        

        return $a;

    }

function writeJavascript($events)

{

	

	$id = $events['event_id'];

	$sql = "SELECT area_id,group_name,event_name,DATE_FORMAT(event_date,'%M %e, %Y') AS event_date,TIME_FORMAT(start_time,'%l:%i %p') AS start_time,TIME_FORMAT(end_time,'%l:%i %p') AS end_time,location_name,location_street,location_city,details,DATE_FORMAT(edit_date,'%M %e, %Y %l:%i %p') AS edit_date,DATE_FORMAT(add_date,'%M %e, %Y %l:%i %p') AS add_date,add_user FROM events WHERE event_id=".$id."";

	$results = mysql_query($sql) or die('should not see me');

		$j_s = '';

	$id = $events['area_id'];

	$sql = "SELECT area_name from areas WHERE area_id =".$id."";

	$names = mysql_query($sql) or die('oh no');

	$area = mysql_fetch_array($names);

	$area_name = $area[0];

	$j_s .= '"'.$area_name.'"'.',';

	$fields = mysql_num_fields($results);

	$events = mysql_fetch_array($results);

	for($i = 0; $i < $fields; $i++)

 		$j_s .= '"'.$events[$i].'"'.',';

	$j_s = substr_replace($j_s,'',-1);

	return $j_s;

}

    /* 

        The start day of the week. This is the day that appears in the first column

        of the calendar. Sunday = 0.

    */

    var $startDay = 0;



    /* 

        The start month of the year. This is the month that appears in the first slot

        of the calendar in the year view. January = 1.

    */

    var $startMonth = 1;



    /*

        The labels to display for the days of the week. The first entry in this array

        represents Sunday.

    */

    var $dayNames = array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    

    /*

        The labels to display for the months of the year. The first entry in this array

        represents January.

    */

    var $monthNames = array("January", "February", "March", "April", "May", "June",

                            "July", "August", "September", "October", "November", "December");

                            

                            

    /*

        The number of days in each month. You're unlikely to want to change this...

        The first entry in this array represents January.

    */

    var $daysInMonth = array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    

}

?>

