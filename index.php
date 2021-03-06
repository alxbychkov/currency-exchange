<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/style.css">
    <title>Обмен валют</title>
</head>
<body class="body">
    <header class="header">
        <div class="container">
            <nav class="nav-menu">
                <ul class="menu">
                    <li class="menu__item"><a href="#" router-link class="menu__link">Обмен</a></li>
                    <li class="menu__item"><a href="#currency" router-link class="menu__link">Курсы валют</a></li>
                    <li class="menu__item"><a href="#chart" router-link class="menu__link">График</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main class="main">
        <div class="container">
            <div id="app"></div>
        </div>
    </main>
    <footer class="footer">
        <div class="container">
            <p>&copy; Copyright 2022</p>
        </div>
    </footer>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/annotations.js"></script>
    <script type="module" src="index.js"></script>
</body>
</html>