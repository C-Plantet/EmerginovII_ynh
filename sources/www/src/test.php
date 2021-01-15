<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>insert page</title></head>
<body>

<?php

      //echo shell_exec('git pull');

		// VERSION II

      /* echo shell_exec('cd .. && mkdir $usermane &&  
              git init &&
	git add README.md
	&& git commit -m "first commit"
	&& git remote add origin git@github.com:emerginov/$username.git
	&& git push -u origin master'); */


      
      echo shell_exec('whoami');

      //echo shell_exec('cd .. && git pull');



/*function execPrint($command) {
    $result = array();
    shell_exec($command, $result);
    print("<pre>");
    foreach ($result as $line) {
        print($line . "\n");
    }
    print("</pre>");
}
// Print the exec output inside of a pre element
execPrint("cd .. && git pull");
execPrint("git status");
execPrint("whoami");*/

?>

</body>
</html>
