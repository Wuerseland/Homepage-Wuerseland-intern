<!doctype html>
<html lang="de">
	<head>
		<?php include ("./configuration.php"); ?>
		<?php include ($lib.'head.php'); ?>
	</head>
	<body>

		<!-- Zuerst einmal Übergabeparameter lesen. --> 
		<?php 
			/* 20260709 -->
			$ziel = $_GET["page"];
			if ($ziel == "")
				$ziel = './pages/home.html';
			// echo 'page: '.$ziel.'<br>';
			$subnav = $_GET["subnav"];
			*/
			$ziel = $_GET["page"] ?? '';
			if ($ziel === '') {
			  $ziel = './pages/home.html';
			}

			// Nur Seiten aus ./pages/ erlauben
			$ziel = ltrim($ziel, '/');          // führende / weg
			$ziel = str_replace('\\', '/', $ziel);

			$allowedBase = realpath(__DIR__ . '/pages');
			$targetPath  = realpath(__DIR__ . '/' . $ziel);

			// Fallback, falls ungültig
			if ($targetPath === false || strncmp($targetPath, $allowedBase, strlen($allowedBase)) !== 0) {
			  $ziel = './pages/home.html';
			}
			// 20260709 <--
		?>


		<div id="overlay" aria-hidden="true">
		</div>
		<div id="app">
			<!--aside id="sidebar" aria-label="Seitennavigation"></aside-->
			<div class="container">
				<?php include(__DIR__.'/navigation.php'); ?>
			

				<main id="main" role="main">
					<header class="topline">
						<button id="menu-toggle" aria-label="Menü umschalten">☰</button>
						<!--h1 id="page-title">Start</h1-->
					</header>

					<section id="content" class="card">
						<!-- Seiteninhalt wird hier geladen -->
						<!--p>Lade Inhalt…</p-->
						<?php 	
							// echo 'Ziel: '.$ziel.'<br>';
							//echo 'subnav: '.$subnav.'<br>';
							include ($ziel);
						?>
					</section>
				</main>
			</div>
		</div>

		<!-- Fussbereich -->
		<?php include ($lib.'footer.php'); ?>

		<script src="assets/app.js" defer></script>
		<!--script src="assets/menu-toggle.js" defer></script-->

	</body>
</html>
