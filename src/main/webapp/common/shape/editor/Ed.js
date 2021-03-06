OG.shape.Ed = function (label) {
    OG.shape.Ed.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.Ed';
    this.LABEL_EdITABLE = false;
    this.label = label;
    this.CONNECTABLE = false;
    this.DELETABLE = false;
};
OG.shape.Ed.prototype = new OG.shape.DIDS();
OG.shape.Ed.superclass = OG.shape.DIDS;
OG.shape.Ed.prototype.constructor = OG.shape.Ed;
OG.Ed = OG.shape.Ed;

OG.shape.Ed.prototype.createSubShape = function () {
    var me = this;

    //TODO ED 는 각 ED 타입에 따라서 Activity 변경법으로 바꾸면 된다.

    var DHI_IntelliSheet_Xml = '<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="384.000000pt" height="384.000000pt" viewBox="0 0 384.000000 384.000000" preserveAspectRatio="xMidYMid meet" stroke-width="20"> <metadata> CreatEd by potrace 1.10, written by Peter Selinger 2001-2011 </metadata> <g transform="translate(0.000000,384.000000) scale(0.100000,-0.100000)"> <path d="M1795 3353 c-97 -11 -238 -68 -338 -136 -62 -43 -192 -174 -208 -210 -5 -12 -18 -35 -29 -52 -11 -16 -23 -37 -26 -45 -3 -8 -12 -28 -19 -45 -27 -65 -37 -104 -50 -205 -11 -88 -11 -121 0 -205 15 -112 24 -140 73 -240 49 -102 54 -110 107 -170 60 -69 75 -71 75 -7 0 66 20 125 55 164 32 35 93 68 125 68 11 0 37 6 57 14 21 7 62 19 91 26 49 11 54 10 96 -14 37 -21 57 -26 115 -26 59 0 78 4 112 26 38 24 44 25 92 13 29 -6 72 -18 96 -25 25 -8 53 -14 63 -14 24 0 76 -26 106 -54 43 -38 62 -89 62 -166 0 -45 4 -70 11 -70 16 0 73 62 118 129 44 64 111 203 111 229 0 9 7 39 15 66 30 98 12 334 -31 419 -8 16 -14 37 -14 47 0 9 -7 23 -15 30 -8 7 -15 18 -15 26 0 21 -74 125 -131 185 -103 106 -214 174 -365 223 -52 17 -257 29 -339 19z m248 -230 c101 -36 137 -95 137 -231 0 -40 5 -81 12 -91 9 -15 9 -32 -1 -78 -7 -32 -17 -65 -22 -73 -16 -27 -30 -64 -41 -110 -15 -63 -35 -100 -77 -138 -42 -39 -91 -62 -134 -62 -44 0 -113 36 -148 79 -35 41 -69 122 -69 163 0 15 -5 30 -11 34 -21 13 -49 89 -49 135 0 26 7 60 15 75 10 20 15 59 15 120 0 90 0 92 33 124 19 18 56 40 83 50 66 24 190 26 257 3z"/> <path d="M450 2515 c-50 -11 -71 -19 -120 -47 -8 -4 -26 -13 -39 -18 -13 -6 -56 -43 -96 -83 -193 -193 -212 -486 -46 -709 19 -27 39 -48 43 -48 9 0 10 1 27 75 12 52 58 105 92 105 9 0 36 7 60 16 58 20 112 20 140 0 30 -20 81 -21 121 0 22 12 46 15 82 11 136 -15 203 -59 213 -138 7 -62 10 -69 27 -63 16 6 86 98 86 112 0 4 5 13 11 19 41 41 68 219 51 335 -44 295 -351 499 -652 433z m190 -143 c86 -27 100 -44 100 -122 1 -36 7 -78 14 -95 11 -25 10 -37 -2 -74 -8 -25 -21 -56 -29 -70 -7 -15 -13 -35 -13 -46 0 -42 -60 -106 -111 -118 -14 -4 -41 -2 -59 3 -37 11 -100 76 -100 103 0 10 -11 43 -26 74 -31 69 -40 109 -27 125 6 7 13 46 15 86 6 88 21 108 100 133 67 22 72 22 138 1z"/> <path d="M3130 2515 c-101 -22 -189 -71 -265 -149 -64 -65 -82 -93 -128 -198 -34 -77 -31 -275 4 -368 20 -53 97 -168 119 -180 23 -12 26 -8 33 59 9 78 75 121 209 138 33 4 58 1 82 -11 43 -20 95 -21 124 0 26 18 84 16 170 -7 73 -19 109 -52 123 -114 7 -27 13 -56 15 -62 5 -20 26 -5 60 40 84 115 119 257 98 407 -16 123 -58 206 -149 297 -40 40 -83 77 -96 83 -13 5 -31 14 -39 19 -92 55 -237 73 -360 46z m181 -142 c82 -25 98 -44 102 -130 2 -40 10 -79 16 -87 16 -19 8 -60 -25 -130 -13 -28 -24 -60 -24 -71 0 -29 -62 -94 -100 -105 -17 -5 -45 -7 -61 -3 -40 8 -109 78 -109 112 0 14 -7 39 -15 55 -8 15 -22 48 -30 73 -13 39 -13 47 0 73 9 17 15 56 15 93 0 76 13 93 94 119 65 21 73 21 137 1z"/> <path d="M1876 1938 c-3 -13 -6 -64 -6 -114 0 -74 -3 -93 -16 -98 -9 -3 -105 -6 -215 -6 -109 0 -200 -1 -201 -2 -1 -2 -5 -122 -8 -268 l-5 -265 -90 3 c-108 4 -215 32 -285 73 -8 5 -24 13 -35 18 -30 13 -125 101 -125 116 0 7 -6 18 -14 24 -7 6 -16 25 -20 41 -10 51 -35 80 -65 77 -39 -5 -54 -17 -48 -41 23 -95 95 -204 176 -267 97 -75 210 -115 376 -131 61 -6 116 -15 122 -20 10 -8 13 -87 15 -312 l3 -301 494 -3 c272 -1 498 1 502 5 4 5 10 141 13 303 3 162 5 296 5 298 1 1 26 2 57 2 98 0 245 39 352 93 63 32 176 132 193 171 5 12 13 28 18 36 22 37 42 99 39 121 -2 20 -10 25 -41 27 -36 3 -38 2 -57 -45 -57 -136 -131 -207 -270 -258 -76 -28 -270 -59 -283 -46 -7 7 -14 59 -17 120 l-5 108 -55 65 c-30 36 -73 86 -94 112 -22 26 -59 68 -82 94 l-43 47 -93 5 -93 5 -2 95 c-4 136 -6 140 -52 140 -32 0 -40 -4 -45 -22z m258 -264 c13 -13 16 -42 16 -160 l0 -144 124 0 c89 0 127 -4 133 -12 4 -7 9 -201 10 -431 1 -396 0 -418 -17 -427 -12 -6 -194 -10 -473 -10 -406 0 -456 2 -461 16 -3 9 -6 273 -6 588 0 432 3 575 12 584 9 9 96 12 329 12 275 0 320 -2 333 -16z m98 -83 c25 -35 42 -56 120 -143 15 -17 25 -35 22 -39 -3 -5 -48 -9 -100 -9 l-94 0 0 115 c0 129 7 140 52 76z"/> <path d="M1663 1264 c-3 -8 -2 -19 3 -24 7 -7 384 -14 532 -10 6 0 12 11 12 25 l0 25 -270 0 c-237 0 -271 -2 -277 -16z"/> <path d="M1667 1123 c-15 -15 -6 -43 16 -48 12 -3 135 -4 272 -3 l250 3 3 28 3 27 -269 0 c-148 0 -272 -3 -275 -7z"/> <path d="M1670 945 l0 -25 269 0 c151 0 272 4 275 9 4 5 3 16 0 25 -5 14 -38 16 -275 16 l-269 0 0 -25z"/> <path d="M1670 806 c-26 -33 -1 -36 271 -36 l270 0 -3 23 -3 22 -261 3 c-220 2 -263 0 -274 -12z"/> </g> </svg>';
    var Document_Xml = '<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="384.000000pt" height="384.000000pt" viewBox="0 0 384.000000 384.000000" preserveAspectRatio="xMidYMid meet"> <metadata> CreatEd by potrace 1.10, written by Peter Selinger 2001-2011 </metadata> <g transform="translate(0.000000,384.000000) scale(0.100000,-0.100000)"> <path d="M515 3830 c3 -5 -7 -17 -22 -27 -15 -10 -33 -25 -40 -33 -10 -12 -12 -425 -13 -1862 l0 -1847 37 -30 38 -31 1388 0 c1009 0 1394 3 1410 11 12 6 32 21 45 32 l22 20 0 1394 0 1394 -473 473 c-260 260 -483 476 -495 480 -12 4 -22 14 -22 22 0 12 -131 14 -941 14 -595 0 -938 -4 -934 -10z m1743 -237 c9 -13 12 -115 12 -428 l0 -412 23 -20 c12 -11 29 -24 37 -29 8 -5 202 -11 430 -14 l415 -5 0 -1232 c0 -677 -3 -1234 -6 -1237 -7 -8 -2510 -8 -2518 0 -3 3 -6 766 -6 1695 0 1266 3 1692 12 1697 6 4 366 6 800 4 726 -2 789 -3 801 -19z"/> <path d="M1793 1613 c-50 -17 -105 -69 -135 -126 -19 -36 -22 -58 -22 -152 0 -95 3 -116 23 -152 26 -48 95 -113 120 -113 9 0 22 -5 28 -11 20 -20 118 -23 179 -4 80 25 127 64 160 133 79 167 10 374 -140 425 -59 20 -155 20 -213 0z m167 -85 c74 -25 100 -74 100 -188 0 -79 -3 -95 -25 -130 -27 -42 -88 -80 -130 -80 -32 0 -93 31 -122 62 -58 63 -55 235 5 301 38 42 110 57 172 35z"/> <path d="M2425 1614 c-58 -20 -106 -64 -135 -120 -22 -43 -25 -62 -25 -159 0 -95 3 -115 22 -150 34 -62 54 -82 107 -110 128 -68 272 -26 336 97 l20 38 -33 20 c-46 28 -73 26 -86 -7 -5 -16 -16 -35 -23 -44 -17 -21 -72 -49 -97 -49 -30 0 -84 29 -103 55 -24 32 -50 134 -43 170 19 96 31 128 57 150 61 51 155 41 197 -21 22 -32 26 -33 65 -28 54 9 61 17 47 52 -17 41 -74 93 -118 109 -49 16 -137 15 -188 -3z"/> <path d="M1077 1613 c-9 -8 -9 -526 -1 -547 5 -13 25 -16 117 -16 159 0 220 15 272 65 72 71 98 197 66 327 -20 81 -88 156 -151 169 -53 10 -294 12 -303 2z m301 -109 c40 -38 52 -79 52 -171 0 -145 -41 -190 -171 -192 -30 -1 -60 4 -67 11 -13 13 -18 359 -4 372 4 5 44 6 89 3 61 -3 86 -9 101 -23z"/> </g> </svg>';
    var Cad_xml = '<?xml version="1.0" standalone="no"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="384.000000pt" height="384.000000pt" viewBox="0 0 384.000000 384.000000" preserveAspectRatio="xMidYMid meet"> <metadata> CreatEd by potrace 1.10, written by Peter Selinger 2001-2011 </metadata> <g transform="translate(0.000000,384.000000) scale(0.100000,-0.100000)"> <path d="M515 3830 c3 -5 -7 -17 -22 -27 -15 -10 -33 -25 -40 -33 -10 -12 -12 -425 -13 -1862 l0 -1847 37 -30 38 -31 1388 0 c1009 0 1394 3 1410 11 12 6 32 21 45 32 l22 20 0 1394 0 1394 -473 473 c-260 260 -483 476 -495 480 -12 4 -22 14 -22 22 0 12 -131 14 -941 14 -595 0 -938 -4 -934 -10z m1743 -237 c9 -13 12 -115 12 -428 l0 -412 23 -20 c12 -11 29 -24 37 -29 8 -5 202 -11 430 -14 l415 -5 0 -1232 c0 -677 -3 -1234 -6 -1237 -7 -8 -2510 -8 -2518 0 -3 3 -6 766 -6 1695 0 1266 3 1692 12 1697 6 4 366 6 800 4 726 -2 789 -3 801 -19z"/> <path d="M2482 1616 c-17 -7 -37 -17 -44 -24 -7 -7 -17 -12 -22 -12 -12 0 -56 -44 -56 -56 0 -4 -6 -15 -13 -23 -26 -30 -50 -130 -44 -181 9 -72 35 -143 68 -183 61 -75 212 -117 301 -84 24 8 54 18 68 21 14 3 42 19 63 36 l37 31 0 99 c0 57 -4 102 -10 105 -8 5 -146 8 -220 5 -15 0 -13 -80 3 -81 6 -1 32 -2 57 -3 l45 -1 3 -41 c3 -46 -3 -53 -68 -77 -58 -21 -80 -21 -127 1 -78 36 -103 83 -103 191 0 68 4 87 24 119 30 48 42 57 93 72 57 17 107 6 152 -36 39 -34 88 -45 119 -25 39 24 -37 119 -116 145 -58 18 -161 19 -210 2z"/> <path d="M987 1605 c-9 -21 -9 -518 -1 -539 5 -13 25 -16 123 -16 220 1 290 37 335 173 32 96 13 241 -42 314 -50 67 -78 76 -252 81 -141 4 -158 3 -163 -13z m320 -120 c33 -38 33 -39 33 -146 0 -135 -16 -171 -85 -188 -69 -17 -143 -14 -153 7 -12 22 -10 342 2 361 7 10 28 12 89 9 79 -5 82 -6 114 -43z"/> <path d="M1523 1603 c-3 -9 -1 -34 6 -57 7 -23 16 -62 21 -89 5 -26 13 -62 19 -80 11 -36 28 -110 41 -177 4 -25 13 -56 18 -70 6 -14 13 -37 16 -52 6 -26 10 -28 56 -28 54 0 73 16 85 75 6 28 11 50 49 185 9 30 18 66 20 80 12 61 56 78 56 22 0 -15 6 -47 14 -72 24 -76 45 -153 52 -189 3 -19 13 -49 20 -67 14 -32 17 -34 64 -34 56 0 60 5 82 100 5 25 16 68 23 95 21 80 37 147 45 190 4 22 12 52 18 66 13 33 18 91 8 107 -4 6 -23 12 -41 12 -42 0 -59 -28 -74 -119 -5 -34 -12 -65 -15 -69 -3 -5 -10 -37 -15 -71 -12 -72 -38 -122 -52 -100 -5 8 -9 25 -9 39 0 14 -6 45 -14 70 -19 61 -35 125 -46 184 -5 27 -15 53 -22 58 -7 4 -37 8 -66 8 -53 0 -53 0 -72 -42 -11 -24 -20 -51 -20 -62 0 -10 -6 -39 -14 -65 -27 -86 -46 -158 -46 -174 0 -20 -19 -32 -24 -15 -19 58 -50 193 -73 308 -7 39 -22 50 -65 50 -27 0 -41 -5 -45 -17z"/> </g> </svg>';

    var stroke = 'none';
    var color = 'black';
    var opacity = 1;
    if (this.data) {
        stroke = this.data.stroke;
        color = this.data.color;
        if (!color || color == 'none') {
            color = 'black';
        }
        if (this.data.blur) {
            opacity = 0.3;
        }
        if(this.data.data.extData['c_securitylevel'] == 'Secret'){
            opacity = 0.3;
        }
    }
    this.sub = [];

    //TODO edType 에 따른 이미지 선택 변경 로직. (c_type 을 다른걸로 오도록)
    if (this.data.data.extData['c_type']) {
        var xml;
        if (this.data.data.extData['c_type'] == 'Document') {
            xml = Document_Xml;
        }
        else if (this.data.data.extData['c_type'] == '2D & 3D Drawing') {
            xml = Cad_xml;
        }
        else if (this.data.data.extData['c_type'] == 'Data List') {
            xml = DHI_IntelliSheet_Xml;
        }
        if (xml) {
            this.sub.push({
                shape: new OG.SvgShape(xml),
                width: '100%',
                height: '100%',
                left: '0%',
                top: '0%',
                style: {
                    'fill': color,
                    'fill-opacity': 1,
                    'stroke': stroke,
                    'stroke-width': '80',
                    'opacity': opacity
                }
            })
        }
    }

    //체크박스 및 표시
    if (me.data.position == 'my-out' || me.data.position == 'my') {
        me.addCheckBox();
    }

    //c_team,c_workflow 표현
    if (this.data.position == 'my-in') {
        me.addTopLabel();
    }

    me.addSecret();
    me.addLock();

    return this.sub;
};