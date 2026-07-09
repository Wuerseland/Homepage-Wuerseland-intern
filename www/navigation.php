<!-- includes/navigation.php -->

<!-- 20260709 -- > 
<div id="sidebar" aria-label="Seitennavigation">
  <div class="brand">Würseland</div>
  <nav>
    <a id="home" href="index.php?page=pages/home.html">Start</a>
    <a id="netzwerk" href="index.php?page=pages/netzwerk.html">Netzwerk</a>
    < a id="ip-adressen" href="index.php?page=pages/ip-adressen.html">IP-Adressen</a>
    < a id="proxmox1" href="index.php?page=pages/proxmox1.html">Proxmox 1</a>
    <a id="smarthome" href="index.php?page=pages/smarthome.html">Smarthome</a>
    <a id="farbcodes" href="index.php?page=pages/html_css_farbcodes.html">Farbcodes</a>
  </nav>
</div>
-->

<?php
$currentPage = $_GET['page'] ?? '';

$networkActive =
  ($currentPage === 'pages/netzwerk/index.html') ||
  str_starts_with($currentPage, 'pages/netzwerk/');

$networkThemesActive = $networkActive && ($currentPage !== 'pages/netzwerk/index.html');
?>

<div id="sidebar" aria-label="Seitennavigation">
  <div class="brand">Würseland</div>

  <nav>
    <a id="home" href="index.php?page=pages/home.html">Start</a>

    <div class="<?= $networkActive ? 'active' : '' ?>">
      <a id="netzwerk" href="index.php?page=pages/netzwerk/index.html">Netzwerk</a>

      <ul class="submenu" <?= $networkActive ? '' : 'hidden' ?>>
        <!--li>
          <a href="index.php?page=pages/netzwerk/index.html">Übersicht</a>
        </li-->

        <li class="<?= $networkThemesActive ? 'active' : '' ?>">
          <!--a href="index.php?page=pages/netzwerk/server.html">Themen</a-->

          <ul class="submenu" <?= $networkThemesActive ? '' : 'hidden' ?>>
            <li><a href="index.php?page=pages/netzwerk/server.html">Server</a></li>
            <li><a href="index.php?page=pages/netzwerk/verkabelung.html">Verkabelung</a></li>
            <li><a href="index.php?page=pages/netzwerk/ip-adressen.html">IP-Adressen</a></li>
            <li><a href="index.php?page=pages/netzwerk/dns.html">DNS</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <a id="proxmox1" href="index.php?page=pages/proxmox1.html">Proxmox 1</a>
    <a id="smarthome" href="index.php?page=pages/smarthome.html">Smarthome</a>
    <a id="farbcodes" href="index.php?page=pages/html_css_farbcodes.html">Farbcodes</a>
  </nav>
</div>

<!-- 20260709 <-- --> 



