<html>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Style-Type" content="text/css" />
    <title>VCard Demo</title>
    <script language="javascript">
        function showVCard() {
            document.getElementById('VCardActivator').style.display = 'none';
            document.getElementById('VCardContent').style.display = 'block';
            document.getElementById('VCardContent').innerHTML = ' \
                <h1>Volkan Özçelik</h1>\
                <dl>\
                <dt>Web</dt>\
                <dd><a href="http://o2js.com">o2js.com</a></dd>\
                <dt>Email</dt>\
                <dd><a href="mailto:volkan@o2js.com">volkan@o2js.com</a></dd>\
                <dt>twitter</dt>\
                <dd><a href="http://twitter.com/linkibol">@linkibol</a></dd>\
                <dt>LinkedIn</dt>\
                <dd><a href="http://linkedin.com/in/volkanozcelik"\
                    >linkedin.com/in/volkanozcelik</a></dd>\
                </dl>\
                <p class="clear"><a href="javascript:void(closeVCard())" class="close" title="close"\
                    ><span>back to home</span></a></p>';

        }

        function closeVCard() {
            document.getElementById('VCardActivator').style.display = 'block';
            document.getElementById('VCardContent').style.display = 'none';
        }
    </script>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-family : Tahoma, Verdana, Arial, Helvetica, sans-serif;
        }

        h1 {
            background: #fff;
            font-family: Georgia, "Times New Roman", times, serif;
            font-weight: normal;
            font-size: 36px;
            letter-spacing: 2px;
            margin-bottom: 2px;
            padding-bottom: 5px;
            padding-left: 15px;
            padding-top: 3px;
            text-align: left;
        }

        dd a {
            color: #000000;
            display: block;
            padding: 5px 5px 5px 15px;
            letter-spacing: 1px;
            text-align: left;
            text-decoration: none;
        }

        dd a:hover {
            background: #fff;
            text-decoration: underline;
        }

        #VCardContainer {
            background: #dadada;
            border: 10px solid rgba(0,0,0,0.25);
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
            margin: 30px auto;
            padding-top: 0;
            padding-bottom: 1px;
            position: relative;
            text-align: center;
            text-shadow: 0 -1px 1px rgba(0,0,0,0.25);
            width: 500px;
        }

        dt.clear {
            float: none;
        }

        dt {
            background: #666;
            color: #cacaca;
            display: block;
            font-weight: bold;
            float: left;
            letter-spacing: 1px;
            margin: 1px 0 0px 0;
            padding: 5px 16px 5px 5px;
            text-align: right;
            width: 115px;

        }

        dd {
            background: #bababa;
            display: block;
            float: left;
            margin: 1px 0px 0px 0;
            text-align: left;
            width: 364px;
        }

        .close {
            background: url('/o2.js/examples/vcardapp/images/close.png');
            display: block;
            height: 32px;
            position: absolute;
            right:10px;
            top:7px;
            width: 32px;
        }

        .close span {
            display: none;
        }

        .button, .button:visited {
            border-bottom: 1px solid rgba(0,0,0,0.25);
            -moz-border-radius: 6px;
            -webkit-border-radius: 6px;
            -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.6);
            -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.6);
            background: #222 url('/o2.js/examples/vcardapp/images/vcard.png') 5px 0 no-repeat;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            margin: 10px;
            padding: 5px 10px 10px 6px;
            position: relative;
            text-shadow: 0 -1px 1px rgba(0,0,0,0.25);

            text-decoration: none;
        }

        .button:hover {
            background-color: #111;
            color: #fff;
        }

        .button:active {
            top: 1px;
        }

        .super.button, .super.button:visited {
            font-size: 34px;
            padding: 12px 14px 14px 59px;
        }

        .action.button, .action.button:visited {
            background-color: #ff5c00;
        }

        .action.button:hover {
            background-color: #d45500;
        }

        .clear {
            clear: both;
        }
    </style>
<head>
</head>
<body>
<div id="VCardContainer">
    <p id="VCardActivator"><a href="javascript:void(showVCard())"
        class="super button action" id="vcard-volkan">Volkan Özçelik</a></p>
    <p id="VCardContent"></p>
</div>
</body>
</html>
