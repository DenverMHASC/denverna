<?php
// this file is the include file that writes the pages dynamically
// this class displays all common elements and can be reused for any php page in the denver sub directory
class MainClassFunction 
{
	//MainClassFunction attributes
	var $title;
	// THIS FUNCTION SETS THE TITLE OF THE PAGE DISPLAYED IN BROWSER
	// this function expects a text string for the page title and sets the global variable $title
	function SetTitle($newtitle)
	{
		$this->title = $newtitle;
	}
	// this function writes the <head></head> part of dyanmic pages
	// this function expects no parameters and returns nothing
	function writeHead()
	{
		echo "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>\n";
		echo "<html xmlns='http://www.w3.org/1999/xhtml'>\n";
		echo "<head>\n";
		echo "<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />\n";
		echo "<title>". $this->title." </title> \n";
		echo "<meta name='robots' content='index,follow' />\n";
		echo "<link href='mhasc.css' rel='stylesheet' type='text/css' />\n";
		echo "</head>\n";
	}
	// this function starts the page and writes common elelments ie header and navigation links
	// this function expects no parameters and returns nothing
	function writeCommonElements()
	{
		// start the page
		echo "<body>\n";
		// set the wrapper
		echo "<div id='wrap'>\n";
		// write the banner header
		echo "<div id='header'>\n";
		echo "<a href='index.php' target='_self' style='text-decoration:none;'><img src='image/mhascbanner254.gif' alt='Mile High Area Banner' width='589' height='120' border='0' /></a>\n";
		echo "</div>\n";
		$this -> writeNav();
	}
	// this function writes the navigation links displayed on the left side of the page
	// this function expects no parameters and returns nothing
	function writeNav()
	{
		// get the name of the current page
		$current = basename($_SERVER['PHP_SELF']);
		echo "<div id='nav'>\n";
		// write out the links
		$this -> writeLinks($current);
		echo "</div>\n";
		return;
	}
	// this function writes the common links on each page
	// this function expects the name of the current page and returns nothing
	function writeLinks($current)
	{
		// create an associative array of the common links
		$links = array('seeking.html' => 'Addicts Seeking Recovery',
						'contact.html' => 'Helpline Information<br />Contact Us',
						'mhameetinglist.html' => 'Meeting List',
						'events.html' => 'Upcoming Events',
						'trustedservants.html' => 'Information for Trusted Servants of MHASC',
						'pi.html' => 'Information for Professionals',
						'hi.html' => 'Literature Committee',
						'literature.html' => 'Addicts Seeking Recovery',
						'links.html' => 'Other Links',
						'index_test.php' => 'MHASC Home',
						'http://www.nacolorado.org' => 'Colorado Region');
		// ok this is an anal line of code to ensure we start to transverse the array from the first element
		reset($links);
		// a while loop to write out the links, will not 'walk off' the end of the array
		while(current($links))
		{
			// this conditional changes the color of the link of the current page
			if($current == key($links))
				echo "<a href='".key($links)."' class='tLinks33' style ='color:#999999'>".current($links)."</a>\n";
			// or just write out the standard style anchor
			else
				echo "<a href='".key($links)."' class='tLinks33'>".current($links)."</a>\n";
			// move to next element in array
			next($links);
		}
		return;
	}
	// this function writes the footer on dynamic pages and closes out the div wrap, body and html tags
	function writeFooter()
	{
		echo "<div id='footer'>\n";
		echo"<div class='footer_text'>This page last modified on: ".date('F d,Y',filemtime(basename($_SERVER['PHP_SELF'])))."</div>\n";
		echo "</div>\n";
		// connects  wrap div
		echo "</div>\n";
		// closes out body
		echo "</body>\n";
		// closes out html
		echo "</html>\n";
	}
}
?>
