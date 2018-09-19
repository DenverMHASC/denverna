<?php

/** uncomment out one of the following lines based on production or test

servers. windows handles directories so funky that this must be done page by page **/



// production 

$root = "/home/users/web/b1937/ipw.nacolora/public_html/";

// local top level $root = "c:\\wamp\\www\\nacolorado/";

// local lower level $root = "c:\\wamp\\www\\nacolorado\\";

$dir = getcwd();

$dir1 = str_replace($root, "", $dir."/");

$count = substr_count($dir1, "/") + substr_count($dir1, "\\");

$dots ='';

for($i=0;$i<$count;$i++)

	$dots .= "../"; 

$string = $dots.".scripts/nacolorado_functions.inc.php";

require_once($string);

$string = $dots.".scripts/nacolorado_page_writer.php";

require_once($string);

$string = $dots.".scripts/meeting_functions.inc.php";

require_once($string);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">

<head>

<title>Colorado Region of Narcotics Anonymous:6th and 7th Traditions</title>

<meta name='robots' content='index,follow' />

<link href="<?php echo $dots ?>nacolorado.css" rel="stylesheet" type="text/css" />

</head>

<body>

	<div id="wrap">

		<?php writeNav(basename($_SERVER['PHP_SELF']),$dots) ?>

		<?php writePageHeader("Tradition Notice",$dots) ?>

		</div>

		<div id="pagebody">

			<p>6. An NA group ought never endorse, finance, or lend the NA

				name to any related facility or outside enterprise, lest

				problems of money, property, or prestige divert us from our

				primary purpose.</p>

			<p>7. Every NA group ought to be fully self-supporting, declining

			outside contributions.</p>

			<h3 style="text-align:center ">Qustions?? Comments?? <a href="mailto:nacolorado@nacolorado.org">e-mail me!</a></h3>

		</div>

		<?php writeFooter($dots) ?>

	</div>

</body>

</html>