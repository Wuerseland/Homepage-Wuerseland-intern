<!-- Über dem footer noch der zufällige Spruch. -->
<blockquote>
	<?php
		$filename = $lib.'sprueche.txt';
		$gefunden = false;
		if (file_exists($filename)) {
			$file = file($filename);
			$gefunden = true;
		} else {
			$filename = $lib.'sprueche.txt';
			if (file_exists($filename)) {
				$file = file($lib.'sprueche.txt');
				$gefunden = true;
			}
		}
		if ($gefunden)
		{
			$zeilenzahl = count($file);
			// srand(microtime()*1000000); //Zeile ab PHP 4.2.0 verzichtbar
			$zeilennummer = rand(1 , $zeilenzahl);
			echo $file[$zeilennummer-1];
		} 
		else 
		{
			echo XXX;
		}
	?>
</blockquote>


